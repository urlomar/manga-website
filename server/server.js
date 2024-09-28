const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(cors()); 
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/manga_reviews', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

// Define the review schema and model
const reviewSchema = new mongoose.Schema({
  manga: { type: String, required: true },
  reviewText: { type: String, required: true }, // This should match the field name from frontend
  rating: { type: Number, min: 1, max: 5, required: true },
  username: { type: String, default: 'Anonymous' }
});

const Review = mongoose.model('Review', reviewSchema);

// Get all reviews
app.get('/api/reviews', (req, res) => {
  Review.find({}, (err, reviews) => {
    if (err) {
      console.error('Error fetching reviews:', err);
      res.status(500).send('Error fetching reviews');
    } else {
      res.json(reviews);
    }
  });
});

// Submit a new review
app.post('/api/reviews', (req, res) => {
  const newReview = new Review(req.body);
  newReview.save((err, review) => {
    if (err) {
      console.error('Error saving review:', err);
      res.status(500).send('Error saving review');
    } else {
      res.status(201).json(review); // Return 201 for resource creation success
    }
  });
});

// Server listens on port
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
