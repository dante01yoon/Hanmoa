const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth-routes');
const mongoConnect = require('./config/mongoConfig');


const app = express();
//mongoConnect
mongoConnect();

//Static File Service
app.use(express.static('public'));
//Body-parser
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use('/auth', authRoutes); 
app.get('/', (req,res) => {
  res.render('home');
})

app.listen(5001, () => console.log('Server listening on port 5001'));
