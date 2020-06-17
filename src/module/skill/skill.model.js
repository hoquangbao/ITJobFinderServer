import mongoose, { Schema } from 'mongoose';

const SkillSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: [true, 'Username must be unique'],
  },
  isRemoved: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

export default mongoose.model('Skill', SkillSchema);
