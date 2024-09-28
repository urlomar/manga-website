// src/components/MangaReview.js
import React, { useState } from 'react';

function MangaReview({ reviews, addReview }) {
  const [username, setUsername] = useState('');
  const [reviewText, setReviewText] = useState(''); // This matches server's reviewText field
  const [rating, setRating] = useState(1);
  const [manga, setManga] = useState('Hell’s Paradise');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reviewText) {
      alert('Please write a review before submitting.');
      return;
    }

    const newReview = { username, reviewText, rating, manga };

    try {
      const response = await fetch('http://localhost:5000/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview),
      });

      if (!response.ok) {
        throw new Error('Failed to submit the review');
      }

      const result = await response.json();
      console.log('Review submitted:', result);

      // Call addReview to update the reviews state in App
      addReview(result); // Pass the new review to the parent component

      // Clear form fields
      setUsername('');
      setReviewText('');
      setRating(1);
      setManga('Hell’s Paradise');
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div className="manga-review">
      <header>
        <nav>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#latest-manga">Latest Manga</a></li>
          </ul>
        </nav>
      </header>
      <img
        src="https://i.pinimg.com/originals/6b/f2/75/6bf2754b90fd9ccb50feb0f991d12cb6.gif"
        alt="Flashing Luffy"
        className="flashing-luffy"
      />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <textarea
          placeholder="Write your review..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          required
        />
        <select value={manga} onChange={(e) => setManga(e.target.value)}>
          <option value="Hell’s Paradise">Hell’s Paradise</option>
          <option value="One Piece">One Piece</option>
          <option value="Sakamoto Days">Sakamoto Days</option>
        </select>
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="1">1 Star</option>
          <option value="2">2 Stars</option>
          <option value="3">3 Stars</option>
          <option value="4">4 Stars</option>
          <option value="5">5 Stars</option>
        </select>
        <button type="submit">Submit Review</button>
      </form>
      <div className="reviews">
        {reviews.map((review, index) => (
          <div key={index} className="review">
            <h4>{review.username} rated it {review.rating} stars:</h4>
            <p>{review.reviewText}</p>
            <div>
              {Array.from({ length: review.rating }, (_, i) => (
                <span key={i} role="img" aria-label="star">⭐</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MangaReview;
