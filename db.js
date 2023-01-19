// Importing the mongoose
const mongoose = require('mongoose');

// MongoDB URL
const mongoURI = 'mongodb://localhost:27017/Quotes';

// Connecting to the database
const connectToMongo = () => {
    mongoose.connect(mongoURI, (err) => {
        if (err) {
            console.log("Error while connecting to database");
        } else {
            console.log("Connected to database");
        }
    })
}

// Exporting the module
module.exports = connectToMongo; 