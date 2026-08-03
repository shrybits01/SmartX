import express from "express";
import dotenv from "dotenv";
import dbConnect from "./config/mongoDbConnection.js";
import userRoute from "./routes/userRoute.js";

const app = express(); //calling express and it will create an application named as app
dotenv.config(); // Port from .env (avoid hardcoding

const PORT = process.env.PORT || 4000; //if port is not available in env then use 4000

//console.log("User Route Loaded");
app.use(express.json());

//mount route
app.use("/api/v1", userRoute);
//app.use("/api/v1", authRoutes);

dbConnect();

//creating and starting the server - syntax server.listen(portNo, callBack fn)
app.listen(PORT, ()=>{
    console.log(`Server is successfully running at port no ${PORT}`);
});


