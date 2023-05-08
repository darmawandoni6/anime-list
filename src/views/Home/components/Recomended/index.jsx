import React from 'react';

import Link from 'next/link';

import styles from './styles.module.scss';

function Recomended({ recomend, active, find, list }) {
  return (
    <div className={styles.recomend}>
      <div className={styles.releases}>
        <h3>Rekomendation</h3>
      </div>
      <ul>
        {recomend.map((item, i) => (
          <li
            key={item.mal_id}
            className={i === active ? styles.active : ''}
            onClick={() => find(item, i)}
          >
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
      <section>
        {list.map((item) => (
          <Link key={item.mal_id} href={`/anime/${item.mal_id}`}>
            <div className={styles.pic}>
              <div className={styles.type}>{item.type}</div>
              <div className={styles.completed}>Completed</div>
              <img src={item.images.webp.image_url} alt={item.name} />
            </div>
            <h2>{item.title}</h2>
          </Link>
        ))}
      </section>
    </div>
  );
}

export default Recomended;
