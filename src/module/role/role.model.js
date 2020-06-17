import mongoose, { Schema } from 'mongoose';

const RoleSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  isRemoved: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

export default mongoose.model('Role', RoleSchema);
