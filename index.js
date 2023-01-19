// Fetch the connection from db.js
const connectToMongo = require('./db');

// Connect to the database
connectToMongo();

// Importing the express
const express = require('express')
const cors = require('cors')

// Creating the express app
const app = express()
const port = 3000 || 5000 

// Middleware
app.use(cors())
app.use(express.json())
 
// Importing the routes 
app.use('/api/quotes', require('./routes/quote'))


// Hpmepage route
app.get('/', (req, res) => {
  res.send('Home Page')
})

// Listening to the port
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}/`)
})