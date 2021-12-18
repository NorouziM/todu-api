import mongoose from "mongoose";

const { Schema } = mongoose;

const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date_added: { type: Date, default: Date.now },
  date_completed: { type: Date, default: null },
  is_done: { type: Boolean, default: false },
  due_date: {
    data: {
      type: Date,
      default: Date.now,
    },
    string: String,
  },
  label: String,
  user_id: Number,
});

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
