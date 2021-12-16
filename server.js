const express = require("express");
const dotenv = require("dotenv").config();
const users = require("./routes/users");

const app = express();

app.use("/api/v1/users", users);

app.listen(process.env.PORT);
