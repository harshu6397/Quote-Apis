// Importing the mongoose
const mongoose = require('mongoose');

// MongoDB URL
const mongoURI = 'mongodb+srv://Harshu:test@cluster0.msyevpe.mongodb.net/Quotes?retryWrites=true&w=majority';

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