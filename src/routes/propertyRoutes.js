import express  from "express";
import { formProperty, saveNewProperty, addImage } from "../controllers/propertyController.js";
import { protectRoute } from "../middleware/protectRoute.js";
const router = express.Router();

router.get('/create', protectRoute, formProperty)
router.get('propeties/addImage', addImage)
router.post('/create', protectRoute, saveNewProperty) //protect verifica que exista una sesión activa antes de insertar en la bd


export default router