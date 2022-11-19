// THIS IS OUR SERVER.JS FILE JUST NAME IS CHANGED
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cookieParser = require('cookie-parser');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/postRoutes');
const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:3001',
  credentials: true, //access-control-allow-credentials:true
  // optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

dotenv.config({
  path: './config.env',
});

const database = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(database)
  .then(() => console.log('Database is connected'))
  .catch((err) => console.log(err));

////////////////////////////////////////////////////////////////////

// API ROUTING STARTS HERE

app.use('/api/v1/users', userRoute);
app.use('/api/v1/users', authRoute);
app.use('/api/v1/posts', postRoute);

app.all('*', (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server`);
  err.status = 'fail';
  err.statusCode = 404;

  next(err);
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    error: err,
  });
});

const port = '3000';
app.listen(port, () => {
  console.log(`App runing on server ${port} `);
});
