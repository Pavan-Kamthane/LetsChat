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

app.listen(PORT, console.log(`Server is running on port http://localhost:${PORT}`.bgCyan))