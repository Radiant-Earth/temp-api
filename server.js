const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');



const routes = require('./routes');
const authRoutes =  require('./routes/auth.routes');


dotenv.config();


const app = express();
const PORT = process.env.PORT || 8000;

var whitelist;
var corsOptions;

if (process.env.NODE_ENV === 'production') {
    whitelist = ['http://localhost:3000', 'https://koopon.vercel.app']
    corsOptions = {
          origin: function (origin, callback) {
                if (whitelist.indexOf(origin) !== -1) {
                      callback(null, true)
                    } else {
                          callback(new Error('Not allowed by CORS'))
                        }
                      }
                    }
                } else {
                    corsOptions = {}
                }
                

                app.use(cors(corsOptions));
                app.use(express.json());

app.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Server is running on port: ' + PORT + " Knocking off this project."
    })
});

app.use(authRoutes)
app.use(routes)



mongoose.connect(process.env.MONGODB_URI)
.then(async () => {
    app.listen(PORT, () => {
        console.log('Databse connected and server is running on port: ' + PORT)
    })
})
.catch(console.log)