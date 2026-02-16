import express from "express";
import mongoose from "mongoose";
import userRout from "./routes/userRout.js";

const app = express();
const port = 3001;

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/ecommerce").then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("Failed to connect to MongoDB", err);
});

app.use('/user',userRout )

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
