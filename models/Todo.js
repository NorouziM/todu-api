import mongoose from 'mongoose';

const { Schema } = mongoose;

const todoSchema = new Schema({
  title: {
    type: String,
    required: [true, 'TITLE_IS_REQUIRED'],
  },
  content: {
    type: String,
    required: [true, 'CONTENT_IS_REQUIRED'],
  },
  dateAdded: { type: Date, default: Date.now },
  dateCompleted: { type: Date, default: null },
  isDone: { type: Boolean, default: false },
  dueDate: {
    data: {
      type: Date,
      default: Date.now,
    },
    string: String,
  },
  label: String,
  userId: {
    type: String,
    required: [true, 'INVALID_USERID'],
  },
});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;
