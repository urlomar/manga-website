// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Notice Routes instead of Switch
import './App.css';
import MangaReview from './components/MangaReview';  // Assuming you have this component for reviews
import SignIn from './components/SignIn';            // Import the SignIn component
import SignUp from './components/SignUp';            // Import the SignUp component

function App() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch reviews from backend API
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

  // Use useEffect to fetch reviews when the component mounts
  useEffect(() => {
    fetchReviews();
  }, []);

  // Function to add a new review to the state
  const addReview = (newReview) => {
    setReviews((prevReviews) => [...prevReviews, newReview]); // Add the new review to the existing reviews
  };

  return (
    <Router>
      <div className="container">
        <h1 className="neon-text">Manga Review Website</h1>

        {/* Navigation Links */}
        <nav>
          <Link to="/" className="neon-text">Home</Link> | 
          <Link to="/signin" className="neon-text">Sign In</Link> | 
          <Link to="/signup" className="neon-text">Sign Up</Link>
        </nav>

        {/* Defining Routes */}
        <Routes>
          {/* Home route that shows reviews */}
          <Route path="/" element={loading ? <p>Loading reviews...</p> : <MangaReview reviews={reviews} addReview={addReview} />} />

          {/* Sign In route */}
          <Route path="/signin" element={<SignIn />} />

          {/* Sign Up route */}
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
