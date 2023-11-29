import express from "express";
const router = express.Router();
import { auth } from "../utils/Auth.js";
import { SendStripeApiKey, processPayment } from "../Controller/Payment.js";

router.post("/payment/process", auth, processPayment);
router.get("/stripeapikey", auth, SendStripeApiKey);
export default router;
