import express from "express";
import {
  CreateSubcategory,
  GetAllSubCategory,
  GetSingleSubcategory,
} from "../Controller/SubCategory.js";
const router = express.Router();

router.post("/create", CreateSubcategory);
router.get("/get", GetAllSubCategory);
router.get("/:subcategoryID", GetSingleSubcategory);
export default router;
