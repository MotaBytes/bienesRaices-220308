//Common JS
//NO SE PUEDE TENER ECMS Y COMMON AL MISMO TIEMPO
// importando la librería de express para activar la comunicación vía protocolo HTTP 
//const express = require('express');
import express, { urlencoded } from 'express';
import generalRoutes from './routes/generalRoutes.js';
import userRoutes from './routes/userRoutes.js';
import propertyRoutes from './routes/propertyRoutes.js'
import bd from './config/db.js';
import user from './modells/user.js';
import helmet from 'helmet'; 
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config({path:'src/.env'})

//! Instanciamos el módulo express de la libreria para definir el servidor que aenderá las peticiones
const app = express();
app.use(express.urlencoded({
    extended:false 
}));

//! HABILITAR COOKIEPARSER PARA LEER, ESCRIBIR Y ELIMINAR EN LAS COOKIES DEL NAVEGADOR.
app.use(cookieParser({
    cookie:true
}))


app.set('view engine', 'pug')
app.set('views', './src/views')
app.use(express.static('./src/public'))
app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", 'https://unpkg.com', 'https://cdnjs.cloudflare.com', "'unsafe-eval'"],
      styleSrc: ["'self'", 'https://unpkg.com', 'https://cloudflare.com', 'https://cdnjs.cloudflare.com'],
      imgSrc: ["'self'", 'data:', 'https://unpkg.com', 'https://cloudflare.com', 'https://cdnjs.cloudflare.com', 'https://a.tile.openstreetmap.org', 'https://b.tile.openstreetmap.org', 'https://c.tile.openstreetmap.org'],
      connectSrc: ["'self'", 'https://tile-provider-domain.com'],
    },
  }));
// app.use(helmet.contentSecurityPolicy({
//         directives: {
//             defaultSrc: ["'self'"],
//             scriptSrc: ["'self'",'https://unpkg.com','https://cloudflare.com','unsafe-eval'],
//             styleSrc: ["'self'", 'https://unpkg.com','https://cloudflare.com','unsafe-inline'],
//             imgSrc:["'self'",'data','https://unpkg.com'],
//             fontSrc:["'self'", 'https://unpkg.com']
//     }
// }));


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

app.use('/login', userRoutes)
app.use('/properties', propertyRoutes) 
/*
script(src="https://unpkg.com/leaflet@1.8.0/dist/leaflet.js") LE DA FUNCIÓN AL MAPA
    script(src="https://unpkg.com/esri-leaflet@3.0.8/dist/esri-leaflet.js") INV ESRI, 
    script(src="https://unpkg.com/esri-leaflet-geocoder@2.2.13/dist/esri-leaflet-geocoder.js")
    script(src="https://cdnjs.cloudflare.com/ajax/libs/leaflet-geosearch/2.7.0/bundle.min.js")

*/

