import express from "express";
import {
  CreateProduct,
  DeleteCartProduct,
  GetAllProduct,
  GetProductByCategory,
  GetRelatedProuct,
  PostAddToCart,
  UpdateCart,
  getCart,
  getSingleProduct,
} from "../Controller/Product.js";
import { auth } from "../utils/Auth.js";
const router = express.Router();

router.post("/create", CreateProduct);
router.get("/all", GetAllProduct);
router.get("/gets", GetProductByCategory);
router.get("/get/:id", getSingleProduct);
router.get("/related-product/:productId", GetRelatedProuct);
router.post("/addtocart", auth, PostAddToCart);
router.get("/getcart", auth, getCart);
router.post("/updatecart", auth, UpdateCart);
router.delete("/deletecart", auth, DeleteCartProduct);
export default router;
