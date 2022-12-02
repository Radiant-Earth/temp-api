const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');



const routes = require('./src/routes/routes');
const authRoutes =  require('./src/routes/auth.routes');
const raffleRoutes = require('./src/routes/raffle.routes');
const marketRoutes = require('./src/routes/market.routes');


dotenv.config();


const app = express();
const PORT = process.env.PORT || 8000;

var whitelist;
var corsOptions;

if (process.env.NODE_ENV === 'production') {
    whitelist = ['http://localhost:3000', 'https://koopon.vercel.app', 'https://koopon-puce.vercel.app']
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
            

app.use(cors());
app.use(express.json());

app.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Server is running on port: ' + PORT + " Knocking off this project."
    })
});

app.use(authRoutes);
app.use('/koopon', marketRoutes);
app.use(routes);
app.use(raffleRoutes);




mongoose.connect(process.env.MONGODB_URI)
.then(async () => {
    app.listen(PORT, () => {
        console.log('Database connected and server is running on port: ' + PORT)
    })
})
.catch(console.log)