import React, { useState } from 'react';

const RatingStars = ({ totalStars = 5 }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div style={{ display: 'flex', gap: '5px' }}>
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <span
            key={index}
            onClick={() => setRating(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
            style={{
              cursor: 'pointer',
              color: starValue <= (hover || rating) ? '#ffc107' : '#e4e5e9',
              fontSize: '2rem',
            }}
          >
            &#9733;
          </span>
        );
      })}
    </div>
  );
};

export default RatingStars;
