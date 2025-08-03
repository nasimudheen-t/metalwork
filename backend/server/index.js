const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const router = require('./routes/Router');
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);

app.get('/', (req, res) => {
  res.send('API is running...');
});
const mongodbconnection = process.env.MONGO_URL
console.log(`Connecting to MongoDB at ${mongodbconnection}`);


mongoose.connect(mongodbconnection,)
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err.message));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
