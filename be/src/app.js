const express = require('express');
const jwt = require('jsonwebtoken');
const authRoutes = require('./routes/auth-routes');

const app = express();

app.use('/auth', authRoutes); 
app.get('/', (req,res) => {
  res.render('home');
})

app.listen(5001, () => console.log('Server listening on port 5001'));
