import React, { useState } from 'react';

function MangaReview({ reviews }) {
  const [username, setUsername] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(1);
  const [manga, setManga] = useState('Hell’s Paradise');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reviewText) {
      alert('Please write a review before submitting.');
      return;
    }

    const newReview = { username, reviewText, rating, manga };
    await fetch('http://localhost:5000/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newReview),
    });
    
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
      <img src="https://giffiles.alphacoders.com/219/219506.gif" alt="Flashing Luffy" className="flashing-luffy" />
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
