require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.BASE_PORT || 4000;

const corsOptions = {
    origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));

mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api', apiRoutes);

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
