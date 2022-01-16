import mongoose from 'mongoose';
import colors from 'colors';
import dotenv from 'dotenv';
import connectDb from './config/connectDb.js';
import productsData from './mockData/products.js';
import usersData from './mockData/users.js';
import Product from './models/productModel.js';
import User from './models/userModel.js';
import Order from './models/orderModel.js';
import Review from './models/reviewModel.js';
import Cart from './models/cartModel.js';

dotenv.config();
connectDb();

const importData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    await Review.deleteMany();
    await Cart.deleteMany();

    const users = await User.insertMany(usersData);
    const adminUser = users[0]._id;
    const products = productsData.map((product) => ({
      ...product,
      user: adminUser,
    }));
    await Product.insertMany(products);

    console.log(`Data Imported`.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    await Review.deleteMany();
    await Cart.deleteMany();

    console.log(`Data Deleted`.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  deleteData();
} else {
  importData();
}
