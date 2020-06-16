const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to the API'
  }); 
});
app.post('/api/posts', verifyToken, (req, res) => {
  jwt.verify(req.token, 'hanmoaExample', (err, authData) => {
    if(err){
      res.sendStatus(403); 
    } else {
      res.json({
        message: 'Post created',
        authData
      })    
    }
  })
  
})
app.post('/api/login', (req, res) => {
  //Mock User
  const user = {
    id: 1, 
    username: 'brad',
    email: 'brad@gmail.com'
  } 
  jwt.sign({user}, 'hanmoaExample', {
    expiresIn: '30s'
  }, (err, token) =>{
   res.json({
     token
   }) 
  }); 
});

//Format of token 
//Authorization: Bearer <access_token>

//middleware
function verifyToken(req,res,next){
  //Get auth header value
  const bearerHeader = req.headers['authorization'];
  //check if Bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
    // Split at the space 
    const [bearer, token] = bearerHeader.split(' ');
    // set the token
    req.token = token;  
    // Next middleware
    next(); 
  }else {
  // Forbidden
    res.sendStatus(403);
  }
}

app.listen(5001, () => console.log('Server started port 5001'));
