require("dotenv").config();
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET_KEY

/**
 * @param {any} payload
 * @returns {string} token 
 */

 function generateToken(payload){
   return new Promise(
     (resolve, reject) => {
       jwt.sign(
         payload,
         jwtSecret,
         {
           expiresIn: '7d',
         }, (error, token) => {
           if(error) reject(error);
           resolve(token);
         }
       )
     }
   )
 };

 exports.generateToken = generateToken; 