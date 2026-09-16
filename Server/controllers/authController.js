import OTP from "../models/otp.js";
import User from "../models/user.js";
import otpGenerator from "otp-generator";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

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
            message: "Otp sent successfully.",
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
    
    try{
     //fetch the data
     const {firstName, lastName, password, confirmPassword, otp, email} = req.body;

     console.log(password);

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
      const latestOtp = await OTP.findOne({email: email}).sort({createdAt: -1}); //otp modal to find the latest otp
      console.log("Latest otp: ", latestOtp);

      if(!latestOtp){
        return res.status(400).json({
            success: false,
            messgae: "Otp not found!"
        });
      }


      //verify otp
      if(otp !== latestOtp.otp){
        return res.status(400).json({
            success: false,
            message: "Otp not matched."
        })
      }

     


      //to hash password - we have bcrypt lib for node js
      const hashedPassword = await bcrypt.hash(password, 10);

      //create profile picture:
      const profilePicture  = await `https://api.dicebear.com/10.x/initials/svg?seed=${firstName}%20${lastName}`;

      //console.log("Profile picture: " , profilePic);


      //create entry in db:
      const newUser = await User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
        profilePicture: profilePicture,
      });

      //return the response
      return res.status(200).json
      ({
        success: true,
        message: "Account created successfully.",
        newUser: newUser,
      })

    }

    catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({
        success: false,
        message: error.message
    });
   }
}

//log in
export const login = async(req, res) => {
    try{
        //fetch data
         const {email, password} = req.body;

         //validatin
         if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Please fill all the details",
            })
         }

         //is the email registered or not
         const userDetails = await User.findOne({email: email});

         if(!userDetails){
            return res.status(404).json({
                success: false,
                message: "Email is not registered",
            })
         }

         //matching the password
         //console.log("userDetails", userDetails);
         

         //bcrypt provide a funtion compare to compare the pssword with the 
         //actual hashed password
         //checking the password
         const isMatched = await bcrypt.compare(password, userDetails.password); //isMatched a boolean - true if matched otherwise false


         //password is correct 
         if(isMatched){
           
            //it contains user data
            const payload = {
                //MongoDB/Mongoose automatically gives the document a unique _id:
                 userId: userDetails._id,
                 userEmail: userDetails.email,
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                //when will the token expires
                expiresIn : "2h"
            });

           // console.log("token", token);
         }


         //incorrect password
         else{
            //return the response
            return res.status(404),json({
                success: false,
                message: "Password is not matched",
            })
         }


    }

    catch(error){

    }
}