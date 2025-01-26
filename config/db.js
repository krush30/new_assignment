const mongoose = require('mongoose');
const config = require('config');
const db = config.get("MONGO_URI")


const connectDB = async () => {
    try {
        await mongoose.connect(db, {})
        console.log("MongoDB connected");

    } catch (err) {
        console.error(`Error: ${err.message}`)

    }
}

module.exports = connectDB;