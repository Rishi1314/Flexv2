import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { test, updateUser,deleteUser, onboardUser } from "../controllers/userController.js";

const router=express.Router();

router.post("/update/:id",verifyToken,updateUser)
router.post("/onboard/:id",verifyToken,onboardUser)
router.delete("/delete/:id",verifyToken,deleteUser)

router.get('/', test);


export default router