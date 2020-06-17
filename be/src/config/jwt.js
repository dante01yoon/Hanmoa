require('dotenv').config(); 
let jwtObj = {};
jwtObj.secret = process.env.CLIENT_SECRET; 
module.exports = jwtObj; 
