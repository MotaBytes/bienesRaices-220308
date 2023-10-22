//commond js no se puede tener ecms y commond al mismo
//Hotdemon, práctica 19 Mi primer proyecto en con commond
const express = require('express');


//Instanciamos el modulo
const app = express();


const port = 3000; //Definimos el puerto
//app.listen(port) Notificamos a la instancia de express que comience a escuchar las peticiones
//localhost:3000 en el navegador se vera la magia

app.listen(port, (request, response) => {
    console.log(`EL servicio HTTP ha sido iniciado... \n El servicio esta escuchando por el puerto: ${port}`)
});


//Rutas
// app.get('/', (request, response) => response.send("Hola web!!"));
app.get('/quienEres', (request, response) => response.send("soy tu primera App web en arquitectura SOA (Service Object Oriented)"));
app.get('/queUsas', (request, response) => response.send("Estoy construida en el lenguaje de JavaScript, y utilizo el microservidor de Express."));

app.get('/misDatos', (req, res) => res.json({
    nombre: "Jazziel",
    fechaNacimiento: "2004-01-06",
    matricula: " 220627"}));

//Servidor en express con commond
