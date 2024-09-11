const mongoose = require('mongoose')
const colors = require('colors');


const connetDB  = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`Mongo DB connected ${conn.connection.host}`.bgMagenta)
    } catch (error) {
        console.log(`Error:  ${error.message}`.bgRed)
        process.exit()
    }
}

module.exports = connetDB
