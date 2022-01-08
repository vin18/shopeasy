import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide name'],
      maxlength: 30,
      minlength: 3,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide password'],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);
export default User;
