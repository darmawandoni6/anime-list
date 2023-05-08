import React from 'react';

import styles from '../../styles.module.scss';

const ListCard = ({ data }) => {
  return (
    <div className={styles.listCard}>
      <div className={styles.upscore}>
        <span className={styles.scrt}>Score</span>
        <span className={styles.scr}>8.04</span>
      </div>
      <div className={styles.pic}>
        <div className={styles.type}>{data.type}</div>
        <img src={data.images.webp.image_url} alt={data.title} />
      </div>
      <div className={styles.desc}>
        <h2>{data.title}</h2>
        <p>
          <b>Status</b> : {data.status}
        </p>
        <p>
          <b>Duration</b> : {data.duration}
        </p>
        <p>
          <b>Rating</b> : {data.rating}
        </p>
        <p>
          <b>Genres</b> : {data.genres.map((item) => item.name).join(', ')}
        </p>
        <p>
          <b>Synopsis</b> : {data.synopsis}
        </p>
      </div>
    </div>
  );
};

export default ListCard;
