import  { exit } from 'node:process';
import Price from '../../modells/price.js';
import prices from './priceSeed.js';
import Category from '../../modells/category.js';   //OBJETOS EN MAYÚSCULA
import categories from './categorySeed.js';
import db from '../../config/db.js';

const importData = async () => {
    try {
        // Autenticar
        await db.authenticate()

        // Generar las columnas
        await db.sync();

        // Importar los datos
        await Promise.all([
            Category.bulkCreate(categories),
            Price.bulkCreate(prices)
        ])
        
        console.log('Se han importado los datos de las tablas catálogo :D');
        exit();
        
    } catch (error) {
        console.log(error);
        exit(1);
    }
}

const deleteData = async () => {
    const queryResetCategoryId = "ALTER TABLE tbc_categories AUTO_INCREMENT = 1;"
    const queryResetPriceId = "ALTER TABLE tbc_prices AUTO_INCREMENT = 1;"
    try {
        await Promise.all([
            Category.destroy({
                where: {},
                truncate: false
            }),
            Price.destroy({
                where: {},
                truncate: false
            }),
        ])

        await Promise.all([
            db.query(
                queryResetCategoryId,
                {raw:true}),
            db.query(
                queryResetPriceId,
                {raw:true}) 
        ])
        
    } catch (error) {
        console.log(error);
        exit(1);
    }
}


if(process.argv[2] === "-i"){
    importData();
}
if(process.argv[2] === "-d"){
    deleteData();
}