import express from "express";
import {
  CreateCategory,
  GetCategory,
  GetSubCategory,
  Upadatecategory,
} from "../Controller/Category.js";
const router = express.Router();

router.post("/create", CreateCategory);
router.get("/get", GetCategory);
router.patch("/:categoryId", Upadatecategory);
router.get("/:categoryId", GetSubCategory);

export default router;
