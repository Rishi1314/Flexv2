import {errorHandler} from "../utils/erros.js"
import bcryptjs from "bcryptjs"
import User from "../models/userModel.js"
import Project from "../models/projectModel.js"
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
                techStack:req.body.techStack,
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
  
export const addProject = async (req,res,next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can add only projects to your account!'));
  }
  try {
    const { projectName, techStack, description, githubLink,deployLink, projectPicture,email } = req.body
    const date = new Date()
    const project = new Project({ projectName, techStack, description, githubLink, deployLink,email, projectPicture, date: date.toISOString().split("T")[0] })
    await project.save();
    await User.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          projects:project
        },
      },
      { new: true }
    );

        res.status(201).json(project)

  } catch (error) {
    next(error);
  }
}

export const getProject = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can only view your projects!'));
  }
  try {
    const user = await User.find({_id:req.params.id})
    res.status(201).json(user[0].projects)
  } catch (error) {
    next(error)
  }
}
export const getUser = async (req, res, next) => {
  
  try {
    const user = await User.find({username:req.params.id})
    res.status(201).json(user)
  } catch (error) {
    next(error)
  }
}
export const getUsers = async (req, res, next) => {
  try {
    const user = await User.find({})
    res.status(201).json(user)
  } catch (error) {
    next(error)
  }
}