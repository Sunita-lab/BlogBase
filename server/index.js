const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');


dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Atlas se connected! 🟢'))
  .catch((err) => console.log('Connection error:', err));
// Routes
const blogRoutes = require('./routes/blogRoutes');
app.use('/api/blogs', blogRoutes);  

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Blog Manager API chal raha hai! 🚀' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server port ${PORT} pe chal raha hai`);
});