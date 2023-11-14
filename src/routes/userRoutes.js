import express from "express";
import { formLogin, formRegister, recovery, insertUser, confirmAccount, emailChangePassword, updatePassword, formPasswordUpdate, authenticateUser, userHome } from "../controllers/userControllers.js"

const router = express.Router();


router.get('/',formLogin)
router.get('/register',formRegister)
router.post('/register', insertUser)
router.get('/confirm/:token', confirmAccount)
router.get('/recovery', recovery)
router.post('/recovery', emailChangePassword)
router.post('/', authenticateUser)
router.post('/update-password/:token', formPasswordUpdate)
router.get('/update-password/:token', updatePassword)
router.get('/home', userHome)


export default router