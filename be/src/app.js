const cors = require('cors'); 
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();

//mongodb config 
const mongoConnect = require('./config/mongoConfig');
//mongoConnect
mongoConnect();

//routes controller require
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');
const userRoutes = require('./routes/user');
const roomRoutes = require('./routes/room');

//Static File Service
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cors());


app.get('/', (req,res) => {
  res.render('home');
});

app.use('/auth', authRoutes); 
app.use('/chat', chatRoutes);
app.use('/user', userRoutes);
app.use('/room', roomRoutes);


app.listen(5001, () => console.log('Server listening on port 5001'));
