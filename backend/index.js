import express from "express";
import dotenv from "dotenv";
dotenv.config();
import product from "./Routes/Product.js";
const app = express();
import connectDB from "./Config/db.js";

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/product", product);

const PORT = process.env.PORT || 7000;

app.listen(PORT, async () => {
  console.log(`server is running on port ${PORT}`);
});
