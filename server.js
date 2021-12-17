import express from "express";
import dotenv from "dotenv";
import users from "./routes/users.js";

dotenv.config();

const app = express();

app.use("/api/v1/users", users);

app.listen(process.env.PORT);
