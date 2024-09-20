import React, { useState, useEffect } from 'react';
import './App.css';
import MangaReview from './components/MangaReview';

function App() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/reviews');
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="container">
      <h1 className="neon-text">Manga Review Website</h1>
      {loading ? <p>Loading reviews...</p> : <MangaReview reviews={reviews} />}
    </div>
  );
}

export default App;
