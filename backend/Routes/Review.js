import express from "express";
import {
  DeleteReview,
  EditReview,
  GetReview,
  PostReview,
} from "../Controller/Review.js";
import { auth } from "../utils/Auth.js";
const router = express.Router();

router.post("/product/:productId/review", auth, PostReview);
router.get("/product/:productId/getreview", GetReview);
router.patch("/:reviewId/review", auth, EditReview);
router.delete("/:reviewId/review", auth, DeleteReview);

export default router;
