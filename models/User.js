import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'FIRST_NAME_IS_REQUIRED'],
  },
  lastName: {
    type: String,
    required: [true, 'LAST_NAME_IS_REQUIRED'],
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, 'EMAIL_IS_REQUIRED'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'INVALID_EMAIL'],
  },
  password: {
    type: String,
    required: [true, 'PASSWORD_IS_REQUIRED'],
    select: false,
    minlength: 6,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  phoneNumber: {
    required: [true, 'PHONE_NUMBER_IS_REQUIRED'],
    unique: true,
    type: String,
    default: null,
  },
  avatarUrl: {
    type: String,
    default: null,
  },
  dateAdded: { type: Date, default: Date.now },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.getUserToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  return token;
};

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
