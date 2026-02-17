import dotenv from 'dotenv';
import express from "express";
import mongoose from "mongoose";
import userRout from "./routes/userRout.js";
import cartRoute from './routes/cartRoute.js'
import { seedInitialProducts } from "./services/productServices.js";
import productRoute from "./routes/productRoute.js";
dotenv.config();
const app = express();
const port = 3001;

app.use(express.json());

mongoose.connect(process.env.DATABASE_URL || "").then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("Failed to connect to MongoDB", err);
});

seedInitialProducts();

app.use('/user',userRout )
app.use('/product', productRoute)
app.use('/cart', cartRoute)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
