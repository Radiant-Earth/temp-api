const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


const routes = require('./routes');


dotenv.config();


const app = express();
const PORT = process.env.PORT || 8000;

var whitelist = ['http://localhost:3000',]
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Server is running on port: ' + PORT + " Knocking off this project."
    })
});

app.use(routes)


mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log('Databse connected and server is running on port: ' + PORT)
        })
    })
    .catch(console.log)