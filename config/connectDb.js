import mongoose from 'mongoose';

const connectDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Database Connected`.cyan.underline.bold);
  } catch (error) {
    console.log(`Error connecting database:`, error.message.red.bold);
    process.exit(1);
  }
};

export default connectDb;
