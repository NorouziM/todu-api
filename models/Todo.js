import mongoose from "mongoose";

const { Schema } = mongoose;

const todoSchema = new Schema({
  title: {
    type: String,
    required: [true, "عنوان را وارد کنید."],
  },
  content: {
    type: String,
    required: [true, "محتوا را وارد کنید."],
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
    type: Number,
    required: [true, "آیدی کاربری ارسال نشده است."],
  },
});

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
