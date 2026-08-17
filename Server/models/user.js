import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    // userName:{
    //     type: String,
    //     required: true,
    //     trim: true,
    // },

    firstName:{
         type: String,
         required: true,
         trim: true
    },

    lastName: {
        type: String,
        required: true,
        trim: true
    },

    email:{
        type: String,
        required: true,
        trim: true,
    },

    password:{ 
        type: String,
        required: true,
    },
    
    profilePicture: {
        type: String,
        required: true,
    }
}, {timestamps: true}); //timestamps is a property and will track when the user is created or last updated time

export default mongoose.model("User", userSchema);

