const express =  require('express');
const chats = require('./data/data.js');
const dotenv = require('dotenv');

const app = express()
dotenv.config();


app.get("/",(req,res)=>{
    res.send("App is running")
})

app.get("/api/chat",(req,res)=>{
    res.send(chats)
})

// getting a specific chat from _id

app.get("/api/chat/:id",(req,res)=>{
    // console.log(req.params.id)
    const singleChat = chats.find(
        // meaning of (c) => c._id ===  req.params.id is  that we are looking for a chat object where the id is equal to the id in the url

        (c) => c._id ===  req.params.id //  req.params.id is the id from the url and    

    )

    res.send(singleChat);
})

const PORT  =  process.env.PORT  || 5000


app.listen(PORT, console.log(`Server is running on port http://localhost:${PORT}`))