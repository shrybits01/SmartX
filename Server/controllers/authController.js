import OTP from "../models/otp.js";
import User from "../models/user.js";
import otpGenerator from "otp-generator";
import bcrypt from "bcrypt";

//create and send otp
export const createOtp = async (req, res) => {
    try {

        //fetching email
        const { email } = req.body;

        //validation
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the credentials.",
            });
        }

        //check is user already have a account
        //findOne will return an object when it find the first same thing
        const userDetails = await User.findOne({ email });

        console.log("userDetails: ", userDetails )

        if (userDetails) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        //generate otp
        const generatedOtp = otpGenerator.generate(4, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        // create entry in DB
        const newOtp = await OTP.create({
            email,
            otp: generatedOtp,
        });

        // return response
        return res.status(200).json({
            success: true,
            message: "Otp generated successfully.",
            newOtp,
        });

    }
    catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server error",
        });
    }
};

//sign up
export const signUp = async(req, res) => {
    console.log("SignUp API hit");
    try{
     //fetch the data
     const {firstName, lastName, password, confirmPassword, otp, email} = req.body;
     
     //validation
     if(!firstName || !lastName || !password || !confirmPassword || !otp || !email){
        return res.status(400).json({
           success: false,
           message: "Please fill all the input fields",
        });
      }
      
      //to check the password and confirm password are same or not
      if(password != confirmPassword){
         return res.status(400).json({
            success: false,
            message: "The password and confirm Password are not matched."
         })
      }

      //to check user already registered or not 
      //findOne return one obj only or you can use limit(1)
      const userExist = await User.findOne({email: email});


      if(userExist){
        return res.status(400).json({
            success: false,
            message: "User already registered"
        })
      }

      //to check the latest otp to verify the otp
      //createdAt is the timstamp for every otp (createdAt: -1 means:
      //Sort from newest to oldest.) 
      //since we want the newest one for that we have mentioned limit(1) : it will return only 1 doc
      const latestOtp = await OTP.find({email: email}).sort({createdAt: -1}).limit(1); //otp modal to find the latest otp

      if(!latestOtp){
        return response.status(400).json({
            success: false,
            messgae: "Otp not found!"
        })
      }

      //verify otp
      if(otp !== latestOtp.otp){
        return response.status(400).json({
            success: false,
            message: "Otp not matched."
        })
      }

      //to hash password - we have bcrypt lib for node js
      const hashedPassword = await bcrypt.hash(password, 10);
      
      //create profile picture:
      const profilePic  = await `https://api.dicebear.com/10.x/lorelei/svg?seed=${firstName}%20${lastName}`;

      console.log(profilePic);

    }
    catch(error){

    }
}

