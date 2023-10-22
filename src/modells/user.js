import {DataTypes} from 'sequelize'
import db from '../config/db.js'
    

//* Modelo de la tabla usuarios
const user = db.define('tbb_users', {
    name:{
        type: DataTypes.STRING, //Tipo de dato
        allowNull: false //* Para que sean obligatorios
    },

    email:{
        type: DataTypes.STRING,
        unique:true,
        allowNull:false
    },

    password:{
        type: DataTypes.STRING,
        allowNull:false
    },

    token: {
        type:DataTypes.STRING,
        default:""
    },
    verified: {
        type:DataTypes.BOOLEAN,
        default:false
}
    
});


export default user;