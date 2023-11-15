import express from "express";
import { CreateProduct, GetAllProduct } from "../Controller/Product.js";
const router = express.Router();

router.post("/", CreateProduct);
router.get("/", GetAllProduct);
export default router;
