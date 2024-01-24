import {errorHandler} from "../utils/erros.js"
import bcryptjs from "bcryptjs"
import User from "../models/userModel.js"
export const updateUser=async(req,res,next)=>{
    
    if(req.user.id!==req.params.id){
        return next(errorHandler(401,'You can update only your account!'))
    }
    try {
        
        if(req.body.password){
            req.body.password=bcryptjs.hashSync(req.body.password,10);
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
              $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                profilePicture: req.body.profilePicture,
                techStack:req.body.techStack,
                tags:req.body.tags
              },
            },
            { new: true }
          );
        
        const {password,...rest}=updatedUser._doc
        res.status(200).json(rest)
    } catch (error) {
        console.log(error);
        next(error)
    }
}
export const onboardUser=async(req,res,next)=>{
    if(req.user.id!==req.params.id){
        return next(errorHandler(401,'You can update only your account!'))
    }
    try {
        
        if(req.body.password){
            req.body.password=bcryptjs.hashSync(req.body.password,10);
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
              $set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                description: req.body.description,
                tags:[req.body.tags],
                onboarding:true,
              },
            },
            { new: true }
          );
        
        const {password,...rest}=updatedUser._doc
        res.status(200).json(rest)
    } catch (error) {
        console.log(error);
        next(error)
    }
}

export const test = (req, res) => {
    res.json({
      message: 'API is working!',
    });
  };
  
  export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
      return next(errorHandler(401, 'You can delete only your account!'));
    }
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json('User has been deleted...');
    } catch (error) {
      next(error);
    }
  
  }