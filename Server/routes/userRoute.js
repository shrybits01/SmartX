import express from "express";
import {createOtp, signUp} from "../controllers/authController.js";
const router = express.Router();

//console.log("Inside userRoute");
router.post("/create-otp", createOtp);
router.post("/signUp", signUp);

export default router;