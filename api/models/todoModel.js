import mongoose from "mongoose"

const todoSchema = new mongoose.Schema({
    email: {
        type:String,
        required:true,
        unique:false,
    },
    userId: {
         
        type: String,
        required:true,
            
        
    },
    title: {
        type:String,
        required:true,
    },
    column:{
        type:String,
        required:true,
        default: "todo",
        enum:["backlog","todo","doing","done"]
    },
    
    
}, { timestamps: true })

const Todo = mongoose.model("Todo", todoSchema)
export default Todo