import express  from "express";
import { formProperty, viewProfile, seeProperties } from "../controllers/propertyController.js";
const router = express.Router();

router.get('/create',formProperty)
router.get('/myProperties', seeProperties)
router.get('/myProfile', viewProfile)

export default router