import mongoose from 'mongoose';
import Todo from './Todo.js';

const { Schema } = mongoose;

const collectionSchema = new Schema({
  title: {
    type: String,
    required: [true, 'TITLE_IS_REQUIRED'],
  },
  dateAdded: { type: Date, default: Date.now },
  userId: {
    type: String,
    required: [true, 'INVALID_USERID'],
  },
  doneTodosPercentage: {
    type: Number,
    default: 0,
  },
  totalTodos: {
    type: Number,
    default: 0,
  },
  doneTodos: {
    type: Number,
    default: 0,
  },
  todos: {
    type: mongoose.Schema.ObjectId,
    ref: 'Todo',
  },
});

collectionSchema.pre('save', async function () {
  if (this._id) {
    const todos = await Todo.find({ collectionId: this._id });
    this.todos = todos;
  }
});

collectionSchema.pre('remove', async function () {
  await this.model('Todo').deleteMany({ collectionId: this._id });
});

const Collection = mongoose.model('Collection', collectionSchema);

export default Collection;
