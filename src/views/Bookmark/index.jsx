import React from 'react';

import Link from 'next/link';

import varibale from 'src/constants/varibale';

import styles from './styles.module.scss';

const Bookmark = () => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    let mark = localStorage.getItem(varibale.bookmark);
    mark = JSON.parse(mark);
    setData(mark ?? []);
  }, []);
  return (
    <div className={styles.Bookmark}>
      <section>
        {data.map((item) => (
          <Link href={`/anime/${item.mal_id}`} className={styles.list} key={item.mal_id}>
            <img src={item.images.webp.image_url} alt={data.title} />
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
  );
};

export default Bookmark;
