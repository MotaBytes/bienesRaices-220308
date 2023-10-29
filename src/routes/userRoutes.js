import express from "express";
import { formLogin, formRegister, recovery, insertUser, confirmAccount } from "../controllers/userControllers.js"

const router = express.Router();


router.get('/',formLogin)
router.get('/register',formRegister)
router.get('/recovery', recovery)
router.post('/register', insertUser)
router.get('/confirm/:token', confirmAccount)

export default router