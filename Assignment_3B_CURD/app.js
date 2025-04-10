const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors package
const connectDB = require('./config/dbConfig');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Use cors middleware
app.use(bodyParser.json());

// Routes
app.use('/api', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});