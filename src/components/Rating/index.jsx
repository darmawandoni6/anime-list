import React from 'react';

const Rating = ({ score }) => {
  const [star, setStar] = React.useState({
    full: 0,
    half: 0,
  });
  React.useEffect(() => {
    if (score) {
      const full = score / 2;
      const half = full - parseInt(full);
      setStar({
        full: parseInt(full),
        half: half >= 0.5 ? 1 : 0,
      });
    }
  }, [score]);
  const renderStar = () => {
    const res = [];
    for (let index = 0; index < star.full; index++) {
      res.push(<i className="fas fa-star" style={{ color: '#ffc700' }}></i>);
    }
    for (let index = 0; index < star.half; index++) {
      res.push(<i className="fas fa-star-half" style={{ color: '#ffc700' }}></i>);
    }
    for (let index = 0; index < 5 - res.length; index++) {
      res.push(<i className="far fa-star"></i>);
    }
    return res;
  };
  return renderStar();
};

export default Rating;
