import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import { compareSync, hashSync } from 'bcrypt-nodejs';
import constants from '../../config/constants';

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: [true, 'Username must be unique'],
    minlength: [3, 'Username must equal or longer than 3'],
    maxlength: [120, 'Username must equal or shorter than 120'],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Password must equal or longer than 6'],
    maxlength: [120, 'Password must equal or shorter than 120'],
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    maxlength: [120, 'Email must equal or shorter than 120'],
  },
  phone: {
    type: Number,
    trim: true,
    required: true,
    maxlength: [10, 'Phone must equal or shorter than 10'],
  },
  fullname: {
    type: String,
    required: true,
    maxlength: [80, 'Fullname must equal or shorter than 80'],
  },
  role: {
    type: Number,
    required: true,
    validate: {
      validator(v) {
        return v == constants.ROLE.CANDIDATE || v == constants.ROLE.EMPLOYER;
      },
      message: props => `${props.value} is not a valid role number`,
    },
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
  },
  isRemoved: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

UserSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = this.hashPassword(this.password);
  }
  return next();
});

UserSchema.methods = {
  hashPassword(password) {
    return hashSync(password);
  },
  validatePassword(password) {
    return compareSync(password, this.password);
  },
  generateJWT(lifespan) {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + lifespan);

    return jwt.sign(
      {
        _id: this._id,
        username: this.username,
        role: this.role,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
      },
      constants.JWT_SECRET,
    );
  },
  toJSON() {
    return {
      _id: this._id,
      username: this.username,
      fullname: this.fullname,
      role: this.role,
      email: this.email,
      phone: this.phone,
      company: this.company,
    };
  },
  toAuthJSON() {
    return {
      ...this.toJSON(),
      token: this.generateJWT(10000),
    };
  },
};

UserSchema.index({ fullname: 'text' });

UserSchema.statics = {
  list({ search, queries } = {}) {
    return search ?
      this.find(queries, { score: { $meta: 'textScore' } }).sort({ score: { $meta: 'textScore' } }) :
      this.find(queries).sort({ fullname: 1 });
  },
};

export default mongoose.model('User', UserSchema);
