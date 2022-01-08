import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import cookieParser from 'cookie-parser';
import connectDb from './config/connectDb.js';

import productRoutes from './routes/productRoute.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();
const app = express();

connectDb();
app.use(cookieParser());
app.use(express.json());

app.use(`/api/v1/products`, productRoutes);
app.use(`/api/v1/users`, userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `Server listening in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  );
});
