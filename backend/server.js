const express = require('express');
const chats = require('./data/data.js');
const dotenv = require('dotenv');
const connetDB = require('./config/db.js');
const colors = require('colors');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require("./routes/messageRoutes");
const { errorHandler, notFound } = require('./middleware/errorMiddleware.js');
// const cors = require('cors');



const app = express()
dotenv.config();
connetDB()
const PORT = process.env.PORT || 5000


app.get("/", (req, res) => {
    res.send("App is running")
})
app.use(express.json())
app.use('/api/user', userRoutes)
app.use('/api/chat',chatRoutes)
app.use("/api/message", messageRoutes);

app.use(notFound)
app.use(errorHandler)

// app.listen(PORT, console.log(`Server is running on port http://localhost:${PORT}`.bgCyan))
const server = app.listen(PORT, console.log(`Server is running on port http://localhost:${PORT}`.bgCyan))

const io = require('socket.io')(server,{
    pingTimeOut:60000,
    cors: {
        origin: 'http://localhost:3000'
    }
})

io.on('connection',(socket)=>{
    console.log('Connected to sockit io')

    socket.on('setup',(userData)=>{
        socket.join(userData._id)
        // console.log(userData._id)
        socket.emit('connected')
    })

    socket.on('join chat',(room)=>{
        socket.join(room)
        console.log('user join the room ' + room);
        
    })
})