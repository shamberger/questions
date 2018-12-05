/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  id: String,
  text: String,
  author: String,
  likes: {
    count: {type: Number, default: 0},
    ip: {type: Array, select: false}
  },
  date: { type: Date, default: Date.now },
  tags: [],
  answers: [{
    id: String,
    text: String,
    author: {
      name: String,
      description: String
    },
    date: { type: Date, default: Date.now },
  }],
});

export default mongoose.model('Question', QuestionSchema);
