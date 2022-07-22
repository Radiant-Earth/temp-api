const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();


const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Server is running on port: ' + PORT
    })
});


app.listen(PORT, () => {
    console.log('server is running on port: ' + PORT)
})