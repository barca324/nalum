const mongoose = require('mongoose');
const dotenv = require('dotenv');

function connectToDb() {
    mongoose.connect(
        process.env.DB_CONNECT,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => {
        console.log("Connected to db");
    })
    .catch((err) => {
        console.log("Error connecting to db:", err);
    });
}
module.exports = connectToDb;