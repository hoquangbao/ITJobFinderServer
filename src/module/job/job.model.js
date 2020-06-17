import mongoose, { Schema } from 'mongoose';

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

export default mongoose.model('Job', JobSchema);
