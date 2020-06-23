require('dotenv').config();

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connect to mongodb server
const getMongoConnect = () => mongoose.connect(process.env.MONGO_URI, { useMongoClient: true })
  .then(()=> console.log('Successfully connected to mongodb'))
  .catch(e => console.error(e));

module.exports = getMongoConnect;