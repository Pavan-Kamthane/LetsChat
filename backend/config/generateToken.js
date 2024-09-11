// npm i jsonwebtoken
const jwt = require('jsonwebtoken')

const generateToken =(id)=>{
    //  jwt.sign parameter explain
    // 1st parameter is payload (data we want to send)
    // 2nd parameter is secret key (secret key is used to sign the token)
    // 3rd parameter is how much  time token will be valid (in seconds) like sessions 

    return jwt.sign({ id }, process.env.JWT_SECRET,{
        expiresIn: '2d'
    })
}

module.exports = generateToken