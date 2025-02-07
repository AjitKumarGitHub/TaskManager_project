import express from "express";
const router=express.Router();
import {signup, login, logout,getUserData, updateUser} from "../controllers/userController.js";
import authenticate from "../middleware/authenticate.js"
router.post('/signup',signup)
router.post('/login',login)
router.post('/logout',logout)
router.get('/userData/:id',authenticate,getUserData)
router.put('/updateUser/:id', authenticate, updateUser);

export default router;
