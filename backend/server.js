const express = require('express');
const chats = require('./data/data.js');
const dotenv = require('dotenv');
const connetDB = require('./config/db.js');
const colors = require('colors');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const { errorHandler, notFound } = require('./middleware/errorMiddleware.js');
// const cors = require('cors');



const app = express()
dotenv.config();
connetDB()
const PORT = process.env.PORT || 5000


app.get("/", (req, res) => {
    res.send("App is running")
})
// app.use(cors());  // Enable all CORS requests (or configure specific domains)

app.use(express.json())
// meaining of app.use(express.json()) is 
// it is a middleware function in express.js that parses the JSON bodies of incoming requests
// and adds them to the request object under the req.body property.


app.use('/api/user', userRoutes)
// this is a middleware function that will be called for every incoming request to the /api/user path
// it will call the userRoutes function which is defined in the userRoutes.js file
// and it will pass the request and response objects to the userRoutes function.
// the userRoutes function will then handle the request and send a response back to the client.

app.use('/api/chat',chatRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, console.log(`Server is running on port http://localhost:${PORT}`.bgCyan))