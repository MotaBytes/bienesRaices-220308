//Common JS
//NO SE PUEDE TENER ECMS Y COMMON AL MISMO TIEMPO
//TODO importando la librería de express para activar la comunicación vía protocolo HTTP 
//const express = require('express');
import express, { urlencoded } from 'express'   //*Para evitar error en el type en el package.json   ESTO ES ECMS6
import generalRoutes from './routes/generalRoutes.js';     //*Importamos el archivo de las rutas generales
import userRoutes from './routes/userRoutes.js';
import bd from './config/db.js';
import user from './modells/user.js';

//TODO Instanciamos el módulo express de la libreria para definir el servidor que aenderá las peticiones
const app = express();
app.use(express.urlencoded({
    extended:false 
}));

app.set('view engine', 'pug')
app.set('views', './src/views')
app.use(express.static('./src/public'))
const port = 3000;   //*64400 puertos mtb 1024-SO

//! AGREGAR Y CONFIGURAR EL TEMPLATE ENGINE
app.set('view engine', 'pug')
app.set('views', './src/views')
/*
app.listen(port)    
*/

app.listen(port, (request, response) => {
    //*Le indicamos a la instancia de express que comience a escuchar las peticiones 
    console.log(`El servidor web ha sido iniciado y está esperando solicitudes (request) \n Actualmente se encuentra escuchando a través del puerto ${port}`)})

try {
    bd.authenticate();
    console.log("La conexión a la base de datos ha sido exitosa");
} catch (error) {
    console.log('Hubo un error al intentar conectarme a la base de datos');
    console.log(error);
}

app.use('/', generalRoutes)
app.use('/login', userRoutes)



//!QUEDA PENDIENTE RESPONSE.RENDER() -> QUE PINTA UNA INTERFAZ GRÁFICA A TRAVÉS DE UN MOTOR DE PLANTILLAS (TEMPLATE ENGINE)
