const cors = require("cors");

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// routes
const authRoutes = require("./src/routes/authRoutes");
app.use("/api/auth", authRoutes);

// DB connect
mongoose
  .connect("mongodb://127.0.0.1:27017/daansetu")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// test route
app.get("/", (req, res) => {
  res.send("Server working");
});

// start
app.listen(5000, () => {
  console.log("Server running on port 5000");
});