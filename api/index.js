import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"
import authRoutes from "./routes/authRoute.js"
import userRoutes from "./routes/userRoute.js"
import cookieParser from "cookie-parser";
import path from "path"
import cors from "cors"

dotenv.config()

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Conntected to MONGODB");
}).catch((err)=>{
    console.log(err);
})

const __dirname=path.resolve();
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin:true,credentials:true}))
app.use(express.static(path.join(__dirname,"/client/dist")))
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"client","dist","index.html"))
});


app.listen(3000,()=>{
    console.log("Server on 3000")
})



app.use("/api/user", userRoutes);
app.use("/api/auth",authRoutes)

app.use((err,req,res,next)=>{
    const statusCode=err.statusCode||500;
    const message=err.message||'Internal Server Error';
    return res.status(statusCode).json({
        success:false,
        message,
        statusCode,
    })
})
