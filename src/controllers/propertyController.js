// import Property from '../modells/property.js';
import Price from '../modells/price.js';
import Category from '../modells/category.js';

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
        prices
    });
}


export { formProperty }