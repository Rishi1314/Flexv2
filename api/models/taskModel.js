import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    email: {
        type:String,
        required:true,
        unique:false,
    },
    taskName: {
        type:String,
        required:true,
    },
    description:{
        type: String,
        required:true,
    },
    status:{
        type:String,
        required:true,
        default: "Complete",
        enum:["Complete","Completing","Completed"]
    },
    date:{
        type: Date,
        required:true,
    },
    deadline:{
        type: Date,
        required:true,
    },
    
}, { timestamps: true })

const Task = mongoose.model("Task", taskSchema);
export default Task