import express from "express";
import dotenv from "dotenv";
import errorHandler from "./middleware/error.js";
import users from "./routes/users.js";
import todos from "./routes/todos.js";
import { connectDB } from "./utils/db.js";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/api/v1/users", users);
app.use("/api/v1/todos", todos);
app.use(errorHandler);

const server = app.listen(process.env.PORT);

process.on("unhandledRejection", (err, promise) => {
  server.close(() => {
    process.exit(1);
  });
});
