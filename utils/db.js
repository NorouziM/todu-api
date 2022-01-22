import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((connection) => {
      console.log(
        `Server connected to database! on ${connection.connection.host}`
      );
    })
    .catch((err) => console.log(err));
};
