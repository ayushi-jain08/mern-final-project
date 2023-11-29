import express from "express";
import { auth } from "../utils/Auth.js";
import {
  CreateOrder,
  GetAllOrder,
  GetSingleOrder,
} from "../Controller/Order.js";
const router = express.Router();

router.post("/create", auth, CreateOrder);
router.get("/get", auth, GetAllOrder);
router.get("/get/:id", auth, GetSingleOrder);
export default router;
