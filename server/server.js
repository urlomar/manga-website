const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(cors()); 
app.use(bodyParser.json());


mongoose.connect('mongodb://localhost:3000/manga_reviews')


const reviewSchema = new mongoose.Schema({
  manga: { type: String, required: true },
  review: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  username: { type: String, default: 'Anonymous' }
});

const Review = mongoose.model('Review', reviewSchema);


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


app.post('/api/reviews', (req, res) => {
  const newReview = new Review(req.body);
  newReview.save((err, review) => {
    if (err) {
      console.error('Error saving review:', err);
      res.status(500).send('Error saving review');
    } else {
      res.json(review);
    }
  });
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
