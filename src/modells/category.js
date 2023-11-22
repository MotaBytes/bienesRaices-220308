import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Category = db.define('tbc_categories',{
    name:{
        type: DataTypes.STRING(30),
        allowNule: false
    },
    status:{
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNule: false
    }
})

export default Category