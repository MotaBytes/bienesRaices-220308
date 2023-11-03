//Common JS
//NO SE PUEDE TENER ECMS Y COMMON AL MISMO TIEMPO
// importando la librería de express para activar la comunicación vía protocolo HTTP 
//const express = require('express');
import express, { urlencoded } from 'express'   //*Para evitar error en el type en el package.json   ESTO ES ECMS6
import generalRoutes from './routes/generalRoutes.js';     //*Importamos el archivo de las rutas generales
import userRoutes from './routes/userRoutes.js';
import bd from './config/db.js';
import user from './modells/user.js';
import helmet from 'helmet';  
import dotenv from 'dotenv' 
dotenv.config({path:'src/.env'});

//! Instanciamos el módulo express de la libreria para definir el servidor que aenderá las peticiones
const app = express();
app.use(express.urlencoded({
    extended:false 
}));


app.set('view engine', 'pug')
app.set('views', './src/views')
app.use(express.static('./src/public'))
   //*64400 puertos mtb 1024-SO
app.use(helmet())


app.listen(process.env.SERVER_PORT, (request, response) => {
    //*Le indicamos a la instancia de express que comience a escuchar las peticiones 
    console.log(`El servidor web ha sido iniciado y está esperando solicitudes (request) \n Actualmente se encuentra escuchando a través del puerto locote`)})

try {
    await bd.authenticate();
    console.log("La conexion a la base de datos ha sido exitosa");
    bd.sync();
    console.log("Se ha sincronizado las tablas existentes en la base de datos")
} catch (error) {
    console.log('Hubo un error al intentar conectarme a la base de datos');
    console.log(error);
}

app.use('/', generalRoutes)
app.use('/login', userRoutes)



//!QUEDA PENDIENTE RESPONSE.RENDER() -> QUE PINTA UNA INTERFAZ GRÁFICA A TRAVÉS DE UN MOTOR DE PLANTILLAS (TEMPLATE ENGINE)
