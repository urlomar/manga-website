// src/components/Review.js
import React from 'react';

function Review({ username, rating, review }) {
  return (
    <div className="review">
      <h4>{username}</h4>
      <div className="stars">
        {Array.from({ length: rating }, (_, index) => (
          <span key={index} role="img" aria-label="star">⭐</span>
        ))}
      </div>
      <p>{review}</p>
    </div>
  );
}

export default Review;
