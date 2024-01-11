import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"
import authRoutes from "./routes/authRoute.js"
dotenv.config()

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Conntected to MONGODB");
}).catch((err)=>{
    console.log(err);
})

const app=express()
app.use(express.json())
app.listen(3000,()=>{
    console.log("Server on 3000");
})

app.use("/test",(req,res)=>{
    console.log("workng");
})



app.use("/api/auth",authRoutes)