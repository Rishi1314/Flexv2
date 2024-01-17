import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { test, updateUser } from "../controllers/userController.js";

const router=express.Router();

router.post("/update/:id",verifyToken,updateUser)

router.get('/', test);


export default router