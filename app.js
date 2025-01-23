require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const portfolioRoutes = require('./routes/portfolio');

const app = express();

// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/', portfolioRoutes);
app.get('/', (req, res) => {
    const projects = [
      { title: 'Project 1', description: 'Description 1', image: 'image1.jpg', url: '#' },
      { title: 'Project 2', description: 'Description 2', image: 'image2.jpg', url: '#' },
      { title: 'Project 3', description: 'Description 3', image: 'image3.jpg', url: '#' },
    ];
    res.render('index', { projects });
  });
  

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
