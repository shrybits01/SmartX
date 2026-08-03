import mongoose from "mongoose";
import { sendMail } from "../utils/sendMail.js";
import { otpEmailTemplate } from "../templates/otpEmailTemplate.js";

const otpSchema = new mongoose.Schema({
    otp:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        trim: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
        expires: 10 * 60,
    }

});

const sendOtp = async (email, otp) => {
   await sendMail(email, "for otp verification", otpEmailTemplate(otp))
}

otpSchema.pre("save", async function (next ){
  await sendOtp(this.email, this.otp);
  //next(); //it tells that otp has been sent and now we can store the data
}); 

export default mongoose.model("OTP", otpSchema);