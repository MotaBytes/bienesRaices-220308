import sequelize from 'sequelize';
import dotenv from 'dotenv';
dotenv.config({path:'src/.env'});

//configuración de sequelize
const bd = new sequelize(process.env.BD_NAME, process.env.BD_USER, process.env.BD_PASSWORD, {
    host : process.env.BD_HOST,
    port: 3309,
    dialect: 'mysql',
    define:{
        timestamps:true
    },
    //propiedades del usuario
    pool:{
        max:5,  //usuarios
        min:0,
        acquire:30000,   //tiempo que va a esperar a recibir una petición
        idle:10000,     //suspende la conexión mientras no se ingresa nada
        
    },
    operatorAliases:false
});

export default bd;