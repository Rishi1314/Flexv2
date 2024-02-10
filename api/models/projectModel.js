import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    email: {
        type:String,
        required:true,
        unique:false,
    },
    projectName: {
        type:String,
        required:true,
    },
    description:{
        type: String,
        required:true,
    },
    githubLink:{
        type: String,
    },
    deployLink:{
        type: String,
    },
    date:{
        type: Date,
        required:true,
    },
    projectPicture:{
        type:String,
        default:"https://st.depositphotos.com/2218212/2938/i/450/depositphotos_29387653-stock-photo-facebook-profile.jpg",
    },
    techStack:{
        type: [String],
        required:true,
        default:[]
    },
    userId: {
         
        type: String,
        required:true,
            
        
    }
}, { timestamps: true })

const Project = mongoose.model("Project", projectSchema);
export default Project