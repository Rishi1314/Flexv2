import { errorHandler } from "../utils/erros.js";
import bcryptjs from "bcryptjs";
import User from "../models/userModel.js";
import Project from "../models/projectModel.js";
import Task from "../models/taskModel.js";
import Todo from "../models/todoModel.js";
export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can update only your account!"));
  }
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          firstName: req.body.firstName,
          lastName:req.body.lastName,
          username: req.body.username,
          description:req.body.description,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export const onboardUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can update only your account!"));
  }
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          description: req.body.description,
          tags: [req.body.tags],
          techStack: req.body.techStack,
          onboarding: true,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const test = (req, res) => {
  res.json({
    message: "API is working!",
  });
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can delete only your account!"));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (error) {
    next(error);
  }
};
export const deleteProject = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(401, "You can delete only your account!"));
  }
  try {
    await Project.findByIdAndDelete(req.params.id);
    const updatedProjects =await Project.find({userId:req.params.userId}) 
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        $set: {
          
          projects:updatedProjects
        },
      },
      { new: true }
    );
    
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const addProject = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(
      errorHandler(401, "You can add only projects to your account!")
    );
  }
  try {
    const {
      projectName,
      techStack,
      description,
      githubLink,
      deployLink,
      projectPicture,
      email,
    } = req.body;
    const date = new Date();
    const project = new Project({
      projectName,
      techStack,
      description,
      githubLink,
      deployLink,
      email,
      projectPicture,
      userId:req.user.id,
      date: date.toISOString().split("T")[0],
    });
    await project.save();
    await User.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          projects: project,
        },
      },
      { new: true }
    );
      const user=await User.findById(req.params.id)
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export const addTask = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(
      errorHandler(401, "You can add only projects to your account!")
    );
  }
  try {
    const {
      taskName,
      deadline,
      description,
      
      email,
    } = req.body;
    const date = new Date();
    const task = new Task({
      taskName,
      deadline,
      description,
      
      email,
      date: date.toISOString().split("T")[0],
    });
    await task.save();
    await User.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          tasks: task,
        },
      },
      { new: true }
    );

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

export const getUserProjects = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only view your projects!"));
  }
  try {
    const user = await User.find({ _id: req.params.id });
    res.status(201).json(user[0].projects);
  } catch (error) {
    next(error);
  }
};

export const getProject= async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(401, "You can only view your projects!"));
  }
  try {
    const project = await Project.find({ _id: req.params.id });
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};
export const getAllProjects= async (req, res, next) => {
  // if (req.user.id !== req.params.userId) {
  //   return next(errorHandler(401, "You can only view your projects!"));
  // }
  try {
    const project = await Project.find({});
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  if (req.user.id !== req.body.userId) {
    return next(errorHandler(401, "You can update only your account!"));
  }
  try {
    
    await Project.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          
        projectName: req.body.projectName,
        description:req.body.description,
        githubLink:req.body.githubLink,
        deployLink:req.body.deployLink,
        projectPicture:req.body.projectPicture,
          techStack: req.body.techStack,
        },
      },
      { new: true }
    );
    
    const updatedProjects =await Project.find({userId:req.user.id}) 
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        $set: {
          
          projects:updatedProjects
        },
      },
      { new: true }
    );
    
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export const getTask = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only view your projects!"));
  }
  try {
    const user = await User.find({ _id: req.params.id });
    res.status(201).json(user[0].tasks);
  } catch (error) {
    next(error);
  }
};
export const getUser = async (req, res, next) => {
  try {
    const user = await User.find({ username: req.params.id });
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};
export const getUsers = async (req, res, next) => {
  try {
    const filter = req.body.filter || "";

    const users = await User.find({
      $or: [
        {
          username: {
            $regex: filter,
          },
        },
        {
          firstName: {
            $regex: filter,
          },
        },
        {
          lastName: {
            $regex: filter,
          },
        },
      ],
    });

    res.json({
      user: users.map((user) => ({
        profilePicture:user.profilePicture,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
      })),
    });
    // const user = await User.find({})
    // res.status(201).json(user)
  } catch (error) {
    next(error);
  }
};

export const addTodo = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(
      errorHandler(401, "You can add only projects to your account!")
    );
  }
  try {
    const {
      title,  
      email,column
    } = req.body;
    const date = new Date();
    const todo = new Todo({
      title,
      column,
      email,
      date: date.toISOString().split("T")[0], userId: req.params.id
      
    });
    await todo.save();
    await User.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          todos: todo,
        },
      },
      { new: true }
    );

    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
};

export const getTodos = async(req, res, next) => {
  try {
    const user = await User.find({ _id: req.params.id });
    res.status(201).json(user[0].todos);
  } catch (error) {
    console.log(error);
  }
}

export const updateTodos = async (req, res, next) => {
  // if (req.user.id !== req.body.userId) {
  //   return next(errorHandler(401, "You can update only your account!"));
  // }
  try {
    
    // await Project.findByIdAndUpdate(
    //   req.params.id,
    //   {
    //     $set: {
          
    //     projectName: req.body.projectName,
    //     description:req.body.description,
    //     githubLink:req.body.githubLink,
    //     deployLink:req.body.deployLink,
    //     projectPicture:req.body.projectPicture,
    //       techStack: req.body.techStack,
    //     },
    //   },
    //   { new: true }
    // );
    
    // const updatedProjects =await Project.find({userId:req.user.id}) 
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        $set: {
          
          todos:req.body.todos
        },
      },
      { new: true }
    );
    
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteTodo = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(401, "You can delete only your account!"));
  }
  try {
    await Todo.findByIdAndDelete(req.params.id);
    const updatedTodos =await Todo.find({userId:req.params.userId}) 
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        $set: {
          
          todos:updatedTodos
        },
      },
      { new: true }
    );
    
    res.status(200).json(user.todos);
  } catch (error) {
    console.log(error);
    next(error);
  }
};