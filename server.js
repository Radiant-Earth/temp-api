const express = require('express');
const cors = require('cors');


const app = express();
const PORT = 8000;

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