import React, {useState, useEffect} from 'react';
import LogoAnimation from '../../components/Auth/LogoAnimation.jsx';
import { Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
import toast from 'react-hot-toast';

const SignUp = () => {

   //state variable
    const [formData, setFormData] = useState({
      firstName: "", 
      lastName: "",
      password: "",
      confirmPassword: "",
      email: "" }
    );

    const [loading, setLoading] = useState(false);

    //creating fn that will handle all the changes
   const changeHandler = (event) => {
      // event.target = the input/TextField on which the user typed
    // event.target.name = tells us WHICH form field was changed
    // Example: "email" or "password"

    // console.log(event.target.name);


    // event.target.value = tells us WHAT value the user entered
    // Example: "shreya@gmail.com"

    // console.log(event.target.value);


    // setFormData() is React's state updater function.
    // prev = the previous/latest value of formData.

      setFormData(prev => {
         return { 

            // Object Spread Operator (...)
            // Copies all existing properties from the previous state
            // so that other form fields are NOT lost.
            //using spread operator - return the old value of prev object
            
            ...prev, 
            
            // Computed Property Name
            // [event.target.name] dynamically decides which key to update.
            //
            // If name = "email":
            //     email: event.target.value
            //
            // If name = "password":
            //     password: event.target.value
            //
            // event.target.value contains the new value entered by the user.
            
            [event.target.name]:event.target.value,
         
         } 
      })
   }

   const submitHandler = async (e) => {
    
      e.preventDefault(); //will not relaod the whole page or browser
     
      if(formData.password != formData.confirmPassword){
         toast.error("Password and confirm password are not same")
      }

      if(formData.password.length < 8){
         toast.error("Password must include minimum 8 letters");
         return;
      }

      // Bcz we are taking everything in form but while calling API , it is only taking email
      const data = {
         email: formData.email
       }

      const toastId = toast.loading("sending otp...");

      try{
         setLoading(true);
         const response = await axios.post("http://localhost:3000/api/v1/create-otp", data);
         console.log("Response:", response);
         toast.dismiss(toastId); //jab response aa jaye to yeh msg show kr dega
         toast.success(response.data.message);

         setLoading(false);

     }

     catch(error){
       toast.dismiss(toastId);
       toast.error(error.response?.data?.message || "Something went wrong");
       console.log(error);
       setLoading(false);

     }
   }


   
  
    return (
        <div className = 'flex px-24 py-6'>
        
          {/* Sign Up form */}
          <div className = 'w-[50%] mt-8'>
             <Typography variant = "h3" sx = {{fontWeight:600}} >
              Sign Up
     
             </Typography>
             <p className = "text-[14px] mt-2">Fill the below form to create your account</p>

             { /*form */}
             <div className = 'bg-white rounded-md w-[80%] mt-6 p-6'>
                <form className = ' p-8 flex flex-col gap-6' onSubmit = {submitHandler}>

              <TextField type = "text" 
              variant = "filled"  
              placeholder = "Enter your first name" 
              label = "First Name"
              fullWidth
              required
              onChange = {changeHandler}
              name = 'firstName'></TextField>

              <TextField type = "text" 
              variant = "filled"  
              placeholder = "Enter your last name" 
              label = "Last Name"
              fullWidth
              required
              onChange = {changeHandler}
              name = 'lastName'></TextField>

              <TextField type = "email" 
              variant = "filled"  
              placeholder = "Enter your email" 
              label = "Email"
              fullWidth
              required
              onChange = {changeHandler}
              name = 'email'> 
              {/* name is an HTML input attribute that gives the input a name/identifier. */}
              {/* here it is an input field that represent email */}
              </TextField>

              <TextField type = "password" 
              variant = "filled"  
              placeholder = "Enter your password" 
              label = "Password"
              fullWidth
              required
              onChange = {changeHandler}
              name = 'password'></TextField>

              <TextField type = "Password" 
              variant = "filled"  
              placeholder = "Confirm your password again" 
              label = "confirm Password"
              fullWidth
              required
              onChange = {changeHandler}
              name = 'confirmPassword'></TextField>

              <Button variant = "contained" 
              size = "large"
              type = "submit"
              >Sign up</Button>
              <i class="fa-solid fa-spinner text-black"></i>

             </form>

             <p className = 'text-black mt-6 flex justify-center gap-2 text-[16px]'>Already have an account ?
                <span className = 'text-blue-600'>Sign In</span></p>
             </div>
        </div>

          {/*website logo*/}
          <div className = 'w-[50%] flex justify-center items-center'>
             <LogoAnimation />
          </div>

        </div>
    )

}

export default SignUp;