import express from "express";
import {
  AddToWishList,
  CreateProduct,
  DeleteCartProduct,
  DeleteWholeCartProduct,
  GetAllProduct,
  GetProductByCategory,
  GetRelatedProuct,
  GetWishList,
  PostAddToCart,
  ProductByCategory,
  SearchProduct,
  UpdateCart,
  UpdateProduct,
  getCart,
  getSingleProduct,
} from "../Controller/Product.js";
import { auth } from "../utils/Auth.js";
const router = express.Router();

router.post("/create", CreateProduct);
router.get("/all", GetAllProduct);
router.patch("/updateproduct/:id", UpdateProduct);
router.get("/gets", GetProductByCategory);
router.get("/get/:id", getSingleProduct);
router.get("/related-product/:productId", GetRelatedProuct);
router.post("/addtocart", auth, PostAddToCart);
router.get("/getcart", auth, getCart);
router.post("/updatecart", auth, UpdateCart);
router.delete("/deletecart", auth, DeleteCartProduct);
router.delete("/deletewholecart", auth, DeleteWholeCartProduct);
router.post("/addtowishlist", auth, AddToWishList);
router.get("/getwishlist", auth, GetWishList);
router.get("/search", SearchProduct);
router.get("/:category", ProductByCategory);
export default router;
