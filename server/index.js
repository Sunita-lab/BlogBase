const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config(); // .env file load karo

const app = express();

// Middleware
app.use(cors());           // React ko allow karo
app.use(express.json());   // JSON body parse karo

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Blog Manager API chal raha hai! 🚀' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server port ${PORT} pe chal raha hai`);
});