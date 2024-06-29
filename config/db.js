const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.NODE_ENV === 'test' ? process.env.DB_TEST_URL : process.env.DB_URL;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once('open', () => {
  console.log('Connection Successful');
});

db.on('error', (error) => {
  console.error('Error in MongoDB connection:', error);
});

module.exports = mongoose;
