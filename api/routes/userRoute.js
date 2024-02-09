import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { test, updateUser,deleteUser, onboardUser, addProject,  getUsers, getUser, addTask, getTask, getUserProjects } from "../controllers/userController.js";

const router=express.Router();

router.post("/update/:id",verifyToken,updateUser)
router.post("/onboard/:id",verifyToken,onboardUser)
router.post("/addProject/:id",verifyToken,addProject)
router.post("/addTask/:id",verifyToken,addTask)
router.delete("/delete/:id",verifyToken,deleteUser)

router.post('/getProject/:id',verifyToken,getUserProjects);
router.post('/editProject/:id?userId=',verifyToken,getUserProjects);
router.post('/getTask/:id',verifyToken,getTask);
router.post('/getUser/:id',getUser);
router.post('/getUsers/',verifyToken,getUsers);
router.get('/', test);


export default router