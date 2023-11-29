import express from "express";
import {
  AddShippingAddress,
  PostContact,
  RegisterUser,
  aboutUser,
  loginUser,
} from "../Controller/User.js";
import { auth } from "../utils/Auth.js";

const router = express.Router();

router.post("/register", RegisterUser);
router.post("/login", loginUser);
router.get("/abouts", auth, aboutUser);
router.patch("/shipping", auth, AddShippingAddress);
router.post("/contact", auth, PostContact);

export default router;
