// import Property from '../modells/property.js';
import Price from '../modells/price.js';
import Category from '../modells/category.js';
import { check, validationResult } from "express-validator";

const formProperty = async(req, res) => {
    //TODO: Obtener los precios y categorías actuales para enviarlos al formulario
    const [categories, prices] = await Promise.all([
        Category.findAll(),
        Price.findAll()
    ])

    res.render('properties/create.pug',{
        page:'New property',
        showHeader: true,
        categories,
        prices,
        data: req.body
    });
}

const saveNewProperty = async (req, res) => {
    await check("title").notEmpty().withMessage("The title is required").isLength({min:15, max:150}).withMessage("The title property must have between 15 and 150 characters").run(req)

    await check("description").notEmpty().withMessage("The description is required").run(req)
    console.log(`La categoria es esta que muestro:  ${typeof req.body.category }`)

    await check("category").notEmpty().withMessage("All properties must be categorized").isInt({min:1, max:5}).withMessage("The category is unknown").run(req)

    await check("priceRange").notEmpty().withMessage("All properties must have a price").isInt({min:1, max:8}).withMessage("The price is unknown").run(req)

    await check("nRooms").isInt({min:0, max:10}).withMessage("The number of rooms is unknown").run(req)

    await check("nwc").isInt({min:0, max:5}).withMessage("The number of wc is unknown").run(req)

    await check("street").isInt({min:0, max:5}).withMessage("The number of parking lots is unknown").run(req)

    console.log(`lat: ${req.body.lat}, long: ${req.body.lng}`)

    let data = req.body
    console.log(data);
}

export { formProperty, saveNewProperty }