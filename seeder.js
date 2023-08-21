import mongoose from 'mongoose'
import colors from 'colors'
import dotenv from 'dotenv'
import connectDb from './config/connectDb.js'
import productsData from './mockData/products.js'
import usersData from './mockData/users.js'
import Product from './models/productModel.js'
import User from './models/userModel.js'
import Order from './models/orderModel.js'
import Review from './models/reviewModel.js'
import Cart from './models/cartModel.js'
import Wishlist from './models/wishlistModel.js'

// const mongoose = require('mongoose')
// const colors = require('colors')
// const dotenv = require('dotenv')
// const connectDb = require('./config/connectDb.js')
// const productsData = require('./mockData/products.js')
// const usersData = require('./mockData/users.js')
// const Product = require('./models/productModel.js')
// const User = require('./models/userModel.js')
// const Order = require('./models/orderModel.js')
// const Review = require('./models/reviewModel.js')
// const Cart = require('./models/cartModel.js')
// const Wishlist = require('./models/wishlistModel.js')

dotenv.config()
connectDb()

const importData = async () => {
  try {
    await User.deleteMany()
    await Product.deleteMany()
    await Order.deleteMany()
    await Review.deleteMany()
    await Cart.deleteMany()
    await Wishlist.deleteMany()

    const users = await User.insertMany(usersData)
    const adminUser = users[0]._id
    const products = productsData.map((product) => ({
      ...product,
      user: adminUser,
    }))
    await Product.insertMany(products)

    console.log(`Data Imported`.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const deleteData = async () => {
  try {
    await User.deleteMany()
    await Product.deleteMany()
    await Order.deleteMany()
    await Review.deleteMany()
    await Cart.deleteMany()
    await Wishlist.deleteMany()

    console.log(`Data Deleted`.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  deleteData()
} else {
  importData()
}
