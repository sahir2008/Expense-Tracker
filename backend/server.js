require('dotenv').config({ path: './config/config.env' });
const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const path = require('path');

const connectDB = require('./config/db');
connectDB();

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

const transactions = require('./routes/transaction');

app.use('/api/v1/transcations', transactions)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}


const port = process.env.PORT || 5000;
app.listen(port,
    console.log(
        `Server is running in ${process.env.NODE_ENV} mode on port ${port}`.yellow.bold
    ));