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
  user_id: {
    type: Number,
    required: [true, "آیدی کاربری ارسال نشده است."]
  },
});

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
