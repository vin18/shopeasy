const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const app = express();

app.get(`/`, (req, res) => {
  res
    .status(200)
    .json({ status: 'success', message: 'Hello, this is a shopeasy api' });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(
    `Server listening in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  );
});
