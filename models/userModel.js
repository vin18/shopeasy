import mongoose from 'mongoose';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
      select: false,
    },
    address: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    postalCode: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    passwordResetToken: String,
    passwordResetTokenExpirationDate: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return;

  this.password = await bcrypt.hash(this.password, 10);
  return next();
});

userSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  const oneHour = 1000 * 60 * 60;
  this.passwordResetTokenExpirationDate = Date.now() + oneHour;
  return resetToken;
};

const User = mongoose.model('User', userSchema);
export default User;
