import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDb from './config/connectDb.js';

dotenv.config();
const app = express();

connectDb();

app.get(`/`, (req, res) => {
  res
    .status(200)
    .json({ status: 'success', message: 'Hello, this is a shopeasy api' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `Server listening in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  );
});
