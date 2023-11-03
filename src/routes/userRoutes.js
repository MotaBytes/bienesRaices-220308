import express from "express";
import { formLogin, formRegister, recovery, insertUser, confirmAccount, emailChangePassword, updatePassword, formPasswordUpdate } from "../controllers/userControllers.js"

const router = express.Router();


router.get('/',formLogin)
router.get('/register',formRegister)
router.get('/recovery', recovery)
router.post('/password-recovery', emailChangePassword)
router.post('/update-password', formPasswordUpdate)
router.get('/update-password', updatePassword)
router.post('/register', insertUser)
router.get('/confirm/:token', confirmAccount)


export default router