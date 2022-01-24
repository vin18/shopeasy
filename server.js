import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import cookieParser from 'cookie-parser';
import connectDb from './config/connectDb.js';
import cloudinary from 'cloudinary';

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';

dotenv.config();
const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

connectDb();
app.use(cookieParser());
app.use(express.json());

app.use(`/api/v1/products`, productRoutes);
app.use(`/api/v1/users`, userRoutes);
app.use(`/api/v1/cart`, cartRoutes);
app.use(`/api/v1/orders`, orderRoutes);
app.use(`/api/v1/reviews`, reviewRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `Server listening in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  );
});
