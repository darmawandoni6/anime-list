import React from 'react';

import { useRouter } from 'next/router';

import Rating from '@components/Rating';
import animeAction from '@reducers/Anime/anime.action';
import homeAction from '@reducers/home/home.action';
import Recomended from '@views/List/components/Recomended';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button } from 'reactstrap';
import varibale from 'src/constants/varibale';

import styles from './styles.module.scss';

const Anime = () => {
  const [anime, setAnime] = React.useState({});
  const [alert, setAlert] = React.useState(false);
  const [bookmark, setBookmark] = React.useState(false);
  const [recomend, setRecomend] = React.useState([]);
  const [active, setActive] = React.useState(0);

  const { query } = useRouter();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.anime);
  const { genre, recomend: listRecomend } = useSelector((state) => state.home);

  const { id } = query;

  React.useEffect(() => {
    const fetch = async () => {
      if (!genre) await dispatch(homeAction.fetchGenre());
    };
    fetch();
  }, []);

  React.useEffect(() => {
    if (alert) {
      const time = setTimeout(() => {
        setAlert(false);
      }, 3000);

      return () => {
        clearTimeout(time);
      };
    }
  }, [alert]);

  React.useEffect(() => {
    if (genre && genre[0]) {
      // Shuffle array using Fisher-Yates algorithm
      for (let i = genre.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [genre[i], genre[j]] = [genre[j], genre[i]];
      }

      // Select first 5 elements
      const randomFive = genre.slice(0, 5);
      dispatch(
        homeAction.fetchAnimeList({
          params: { genres: randomFive[0].mal_id },
          genre: randomFive[0].name,
        }),
      );
      setRecomend(randomFive);
    }
  }, [genre]);

  React.useEffect(() => {
    if (id && !data[id]) {
      dispatch(animeAction.fetchAnimeById(id));
    } else if (id && data[id]) {
      let bookmark = localStorage.getItem(varibale.bookmark) ?? [];
      if (bookmark[0]) {
        bookmark = JSON.parse(bookmark);
        bookmark = bookmark.find((item) => item.mal_id === parseInt(id));
        if (bookmark) {
          setBookmark(true);
        }
      }
      setAnime(data[id]);
    }
  }, [data, id]);
  const listDescription = () => {
    let res = [];
    if (anime.mal_id) {
      res = [
        {
          label: 'Status',
          value: anime.status,
        },
        {
          label: 'Studio',
          value: anime.studios.map((item) => item.name).join(', '),
        },
        {
          label: 'Released',
          value: anime.year,
        },
        {
          label: 'Duration',
          value: anime.duration,
        },
        {
          label: 'Season',
          value: <span>{anime.season}</span>,
        },
        {
          label: 'Type',
          value: anime.type,
        },
        {
          label: 'Rating',
          value: anime.rating,
        },
      ];
    }
    return res;
  };
  const handleBookmark = () => {
    let alert = false;
    let bookmark = localStorage.getItem(varibale.bookmark);
    bookmark = JSON.parse(bookmark) ?? [];
    if (!bookmark[0]) {
      const data = [anime];
      localStorage.setItem(varibale.bookmark, JSON.stringify(data));
      alert = true;
    } else if (bookmark[0]) {
      const data = [anime, ...bookmark];
      localStorage.setItem(varibale.bookmark, JSON.stringify(data));
      alert = true;
    }
    setAlert(alert);
    setBookmark(alert);
  };

  const handleBookmarked = () => {
    let bookmark = localStorage.getItem(varibale.bookmark) ?? [];
    if (bookmark[0]) {
      bookmark = JSON.parse(bookmark);
      let idx = bookmark.findIndex((item) => item.mal_id === parseInt(id));
      bookmark.splice(idx, 1);
      localStorage.setItem(varibale.bookmark, JSON.stringify(bookmark));
      setBookmark(false);
    }
  };
  const handleFindByGenre = (item, idx) => {
    setActive(idx);
    if (!listRecomend[item.name]) {
      dispatch(
        homeAction.fetchAnimeList({
          params: { genres: item.mal_id },
          genre: item.name,
        }),
      );
    }
  };

  if (!anime.mal_id) return;
  return (
    <div className={styles.main}>
      <div className={styles.content}>
        {alert && (
          <div className={styles.alert}>
            <Alert color="success">Success Bookmark</Alert>
          </div>
        )}
        <div className={styles.pic}>
          <div className={styles.border}>
            <img src={anime.images.webp.image_url} alt="" />
          </div>
          <div className={styles.rating}>
            <strong>{`Rating ${anime.score}`}</strong>
            <Rating score={anime.score} />
          </div>
          <Button color="danger" onClick={() => window.open(anime.trailer.embed_url, '__blank')}>
            <i className="fab fa-youtube"></i> Trailer
          </Button>
          {bookmark ? (
            <Button
              style={{
                background: '#333',
                color: 'white',
              }}
              onClick={handleBookmarked}
            >
              <i className="far fa-bookmark"></i> Bookmarked
            </Button>
          ) : (
            <Button color="primary" onClick={handleBookmark}>
              <i className="far fa-bookmark"></i> Bookmark
            </Button>
          )}
        </div>
        <div className={styles.desc}>
          <h1>{anime.title}</h1>
          <div className={styles.listDesc}>
            {listDescription().map((item, i) => (
              <div className={styles.item} key={i}>
                <strong>{item.label}</strong> : {item.value}
              </div>
            ))}
          </div>
          <div className={styles.genre}>
            {anime.genres.map((item) => (
              <Button color="primary" outline key={item.mal_id}>
                {item.name}
              </Button>
            ))}
          </div>
          <h2>Synopsis : </h2>
          <p>{anime.synopsis}</p>
        </div>
      </div>
      <Recomended
        recomend={recomend}
        list={listRecomend[recomend[active]?.name] ?? []}
        active={active}
        find={handleFindByGenre}
      />
    </div>
  );
};

export default Anime;
