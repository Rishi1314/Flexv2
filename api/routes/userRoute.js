import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {getAllProjects, test, updateUser,deleteUser, onboardUser, addProject,  getUsers, getUser, addTask, getTask, getUserProjects, updateProject, deleteProject, addTodo, getTodos, updateTodos, deleteTodo } from "../controllers/userController.js";

const router=express.Router();

router.post("/update/:id",verifyToken,updateUser)
router.post("/updateProject/:id",verifyToken,updateProject)
router.post("/updateTodos/:id",verifyToken,updateTodos)
router.post("/onboard/:id",verifyToken,onboardUser)
router.post("/addProject/:id",verifyToken,addProject)
router.post("/addTodo/:id",verifyToken,addTodo)
// router.post("/addTodo/:id",addTodo)
router.post("/addTask/:id",verifyToken,addTask)
router.delete("/delete/:id",verifyToken,deleteUser)
router.delete("/deleteProject/:id/:userId",verifyToken,deleteProject)
router.post("/deleteTodo/:id/:userId",verifyToken,deleteTodo)
// router.delete("/deleteTodo/:id/:userId",verifyToken,deleteTodo)

router.post('/getProject/:id',verifyToken,getUserProjects);
router.post('/getAllProjects',verifyToken,getAllProjects);
router.post('/getTodos/:id',getTodos);
router.post('/editProject/:id?userId=',verifyToken,getUserProjects);
router.post('/getTask/:id',verifyToken,getTask);
router.post('/getUser/:id',getUser);
router.post('/getUsers/',verifyToken,getUsers);
router.get('/', test);


export default router