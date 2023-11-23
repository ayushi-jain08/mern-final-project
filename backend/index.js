import express from "express";
import dotenv from "dotenv";
dotenv.config();
import product from "./Routes/Product.js";
const app = express();
import connectDB from "./Config/db.js";
import fileUpload from "express-fileupload";
import cors from "cors";
import path from "path";
import user from "./Routes/User.js";
import review from "./Routes/Review.js";

connectDB();
const __dirname = path.resolve();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use("/api/product", product);
app.use("/api/user", user);
app.use("/api", review);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
app.use(express.static(path.join(__dirname, "/frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", " build", "index.html"));
});
const PORT = process.env.PORT || 7000;

app.listen(PORT, async () => {
  console.log(`server is running on port ${PORT}`);
});
