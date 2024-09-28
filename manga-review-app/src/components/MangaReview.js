// src/components/MangaReview.js
import React, { useState } from 'react';

function MangaReview({ reviews, addReview }) {
  const [username, setUsername] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(1);
  const [manga, setManga] = useState('Hell’s Paradise');
  const [submissionStatus, setSubmissionStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reviewText) {
      alert('Please write a review before submitting.');
      return;
    }

    const newReview = { username, review: reviewText, rating, manga };

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
      addReview(result);
      setSubmissionStatus('Review submitted successfully!'); // Success message

      // Clear form fields
      setUsername('');
      setReviewText('');
      setRating(1);
      setManga('Hell’s Paradise');
    } catch (error) {
      console.error('Error submitting review:', error);
      setSubmissionStatus('Error submitting review. Please try again.'); // Error message
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
        src="https://i.giphy.com/3oz8xWSZB0PlDmctYA.gif"
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
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          <option value="1">1 Star</option>
          <option value="2">2 Stars</option>
          <option value="3">3 Stars</option>
          <option value="4">4 Stars</option>
          <option value="5">5 Stars</option>
        </select>
        <button type="submit">Submit Review</button>
      </form>
      {submissionStatus && <p>{submissionStatus}</p>} {/* Display status message */}
      <div className="reviews">
        {reviews.length > 0 ? ( // Check if there are reviews
          reviews.map((review, index) => (
            <div key={index} className="review">
              <h4>{review.username} rated it {review.rating} stars:</h4>
              <p>{review.review}</p>
              <div>
                {Array.from({ length: review.rating }, (_, i) => (
                  <span key={i} role="img" aria-label="star">⭐</span>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No reviews available yet.</p> // Empty state message
        )}
      </div>
    </div>
  );
}

export default MangaReview;
