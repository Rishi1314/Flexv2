import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { test, updateUser,deleteUser, onboardUser, addProject, getProject, getUsers, getUser } from "../controllers/userController.js";

const router=express.Router();

router.post("/update/:id",verifyToken,updateUser)
router.post("/onboard/:id",verifyToken,onboardUser)
router.post("/addProject/:id",verifyToken,addProject)
router.delete("/delete/:id",verifyToken,deleteUser)

router.post('/getProject/:id',verifyToken,getProject);
router.post('/getUser/:id',verifyToken,getUser);
router.post('/getUsers/',verifyToken,getUsers);
router.get('/', test);


export default router