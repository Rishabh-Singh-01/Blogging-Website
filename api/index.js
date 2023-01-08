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
const path = require('path');
// ///// ANIME START. ..............................................
// const fetch = require('node-fetch');
// globalThis.fetch = fetch;
// ///// ANIME END...............................................
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

// ///// ANIME START. ..............................................
// app.get('/api/v1/anime', async (req, res) => {
//   const response = await fetch(
//     'https://api.consumet.org/anime/gogoanime/watch/boruto-naruto-next-generations-episode-3',
//     {
//       method: 'GET',
//     }
//   );
//   const some = await response.json();

//   res.status(200).json({
//     status: 'success',
//     data: {
//       anime: some,
//     },
//   });
// });

// ///// ANIME END...............................................

app.use('/api/v1/users', userRoute);
app.use('/api/v1/users', authRoute);
app.use('/api/v1/posts', postRoute);
// below one serves static file
app.use('/api/v1/img', express.static(path.join(__dirname, 'public/img')));

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
