import express from "express";
import mongoose from "mongoose";
import userRout from "./routes/userRout.js";
import cartRoute from './routes/cartRoute.js'
import { seedInitialProducts } from "./services/productServices.js";
import productRoute from "./routes/productRoute.js";

const app = express();
const port = 3001;

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/ecommerce").then(() => {
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
