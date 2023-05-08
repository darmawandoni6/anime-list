import React from 'react';

import Link from 'next/link';

import homeAction from '@reducers/home/home.action';
import { useDispatch, useSelector } from 'react-redux';

import ListCard from './components/ListCard';
import Recomended from './components/Recomended';
import styles from './styles.module.scss';

const Home = () => {
  const [recomend, setRecomend] = React.useState([]);
  const [active, setActive] = React.useState(0);
  const [page, setPage] = React.useState(1);

  const dispatch = useDispatch();
  const { populer, list, genre, recomend: listRecomend } = useSelector((state) => state.home);

  const { data } = list;

  React.useEffect(() => {
    const fetch = async () => {
      if (!populer) await dispatch(homeAction.fetchPopulerAnime());
      if (!data[page]) await dispatch(homeAction.fetchAnimeSeasonNow(page));
      if (!genre) await dispatch(homeAction.fetchGenre());
    };
    fetch();
  }, []);

  React.useEffect(() => {
    if (genre && genre[0]) {
      // Shuffle array using Fisher-Yates algorithm
      for (let i = genre.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [genre[i], genre[j]] = [genre[j], genre[i]];
      }

      // Select first 5 elements
      const randomFive = genre.slice(0, 5);
      const time = setTimeout(() => {
        dispatch(
          homeAction.fetchAnimeList({
            params: { genres: randomFive[0].mal_id },
            genre: randomFive[0].name,
          }),
        );
      }, 1000);
      setRecomend(randomFive);
      return () => clearTimeout(time);
    }
  }, [genre]);

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

  const handleFetchAnime = (page) => {
    setPage(page);
    if (!data[page]) dispatch(homeAction.fetchAnimeSeasonNow(page));
  };

  return (
    <div className={styles.main}>
      <div className={styles.populer}>
        <div className={styles.releases}>
          <h3>Most Popular Today</h3>
        </div>
        <section>
          {populer?.map((item) => (
            <Link href={`/anime/${item.mal_id}`} className={styles.list} key={item.mal_id}>
              <img src={item.images.webp.image_url} alt={populer.title} />
              <footer>
                <header>{item.title}</header>
                <div className={styles.desc}>
                  <div className={styles.type}>{item.type}</div>
                  {item.episodes && (
                    <div className={styles.episode}>{`Episode ${item.episodes}`}</div>
                  )}
                </div>
              </footer>
            </Link>
          ))}
        </section>
      </div>
      <br />
      <div className={styles.update}>
        <div className={styles.releases}>
          <h3>Latest Releases</h3>
        </div>
        {data[page]?.map((item) => (
          <Link href={`/anime/${item.mal_id}`} key={item.mal_id}>
            <ListCard data={item} />
          </Link>
        ))}
        <footer>
          {page > 0 && <span onClick={() => handleFetchAnime(page - 1)}>{'<'} Prev</span>}
          <span onClick={() => handleFetchAnime(page + 1)}>Next {'>'}</span>
        </footer>
      </div>
      <br />
      <Recomended
        recomend={recomend}
        list={listRecomend[recomend[active]?.name] ?? []}
        active={active}
        find={handleFindByGenre}
      />
      <br />
    </div>
  );
};

export default Home;
