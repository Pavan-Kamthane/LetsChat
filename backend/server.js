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
const path = require('path')



const app = express()
dotenv.config();
connetDB()
const PORT = process.env.PORT || 5000

// if deployment nsel tr khlch un comment kr ok

// app.get("/", (req, res) => {
//     res.send("API is running")
// })


app.use(express.json())
app.use('/api/user', userRoutes)
app.use('/api/chat', chatRoutes)
app.use("/api/message", messageRoutes);

// ----------------------Deployment --------------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname1, "/frontend/build")));

    app.get("*", (req, res) =>
        res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
    );
} else {
    app.get("/", (req, res) => {
        res.send("API is running..");
    });
}

// ----------------------Deployment --------------------

app.use(notFound)
app.use(errorHandler)

// app.listen(PORT, console.log(`Server is running on port http://localhost:${PORT}`.bgCyan))
const server = app.listen(PORT, console.log(`Server is running on port http://localhost:${PORT}`.bgCyan))

const io = require('socket.io')(server, {
    pingTimeOut: 60000,
    cors: {
        origin: 'http://localhost:3000'
    }
})

io.on("connection", (socket) => {
    console.log("Connected to socket.io");
    socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected");
    });

    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User Joined Room: " + room);
    });

    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

    socket.on("new message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;

        if (!chat.users) return console.log("chat.users not defined");

        chat.users.forEach((user) => {
            if (user._id == newMessageRecieved.sender._id) return;

            socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
    });

    socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
    });
});