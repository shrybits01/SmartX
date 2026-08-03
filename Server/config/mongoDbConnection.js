//to connect server to mongoDb
import mongoose from "mongoose";

const dbConnect = () => {

mongoose.connect(process.env.DATABASE_URL) //it returns promise
.then(() => {
    console.log("DB connected successfully");
})
.catch((error) => {
    console.log(error);
    console.log("DB connection failed");
})

}

export default dbConnect;