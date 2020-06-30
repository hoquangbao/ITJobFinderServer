import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import constants from '../../config/constants';

const JobSchema = new Schema({
  jobName: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  companyId: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  isRemoved: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

JobSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = this.hashPassword(this.password);
  }
  return next();
});

JobSchema.methods = {
  generateJWT(lifespan) {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + lifespan);

    return jwt.sign(
      {
        _id: this._id,
        role: 'job',
        exp: parseInt(expirationDate.getTime() / 1000, 10),
      },
      constants.JWT_SECRET,
    );
  },
  toJSON() {
    return {
      _id: this._id,
      jobDescription: this.jobDescription,
      salary: this.salary,
      companyId: this.companyId,
      userId: this.userId,
    };
  },
  toAuthJSON() {
    return {
      ...this.toJSON(),
      token: this.generateJWT(10000),
    };
  },
};

JobSchema.index({ fullname: 'text' });

JobSchema.statics = {
  list({ search, queries } = {}) {
    return search ?
      this.find(queries, { score: { $meta: 'textScore' } }).sort({ score: { $meta: 'textScore' } }) :
      this.find(queries).sort({ fullname: 1 });
  },
};

export default mongoose.model('Job', JobSchema);
