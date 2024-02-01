import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    description:{
        type:String
    },
    tags:{
        type:[String],
        default:[]
    },
    techStack:{
        type:[String],
        default:[]
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    onboarding:{
        type:Boolean,
        required:true,
        default:false
    },
    password:{
        type:String,
        required:true,
    },
    projects: {
        type: [{
            type: mongoose.Schema.Types.Object,
            ref: 'Project'
        }],

    },
    profilePicture:{
        type:String,
        default:"https://st.depositphotos.com/2218212/2938/i/450/depositphotos_29387653-stock-photo-facebook-profile.jpg",
    }
},{timestamps:true});

const User=mongoose.model("User",userSchema);
export default User