import express, { application } from "express";
import MainRouter from "./routes/index.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserSchema from "./models/user.schema.js";
import ProductSchema from "./models/product.schema.js";

const app = express();
dotenv.config();
app.use(express.json()); // JSON -> JS

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api/v1", MainRouter);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
