import express, { request, response } from 'express'

const router = express.Router();


//*RUTAS A TRAVÉS DE GET
//T Routing - Contando las peticiones que se reciben por medio de un endpoint (URL)
// endpoint: punto final que te va a retornar un conjunto de datos (No es lo mismo que URL)
//! DESCOMENTAR SI PIDE REVISAR SIGUIENTE CLASE 05-10-23    router.get('/', (request, response)=> response.send("Hola Web"))
router.get('/', (rq, rp)=> rp.render("layout/index.pug"))
router.get('/quienEres', (request, response) => response.send("Soy tu primera router web en arquitectura SOA"))
router.get('/queUsas', (request, response) => response.send("Estoy construida en el lenguaje de programación JavaScript, y utilizo el microservidor de Express"))
router.get('/misDatos', (rq, re) => re.json({nombre: "Diego Hernandez Mota",
fechaNacimiento: "2004-07-05", matricula: "220308"}))
router.get('/get', (request, response)=> response.send("Hi Web from GET"))

//* A TRAVÉS DE POST
router.post('/', (rq, rp) => rp.send("Hi Web from POST verb"))

//* A TRAVÉS DE PUT
router.put('/', (rq, rp) => rp.send("You trying to update some properties of data using PUT"))

//* A TRAVÉS DE PATCH
router.patch('/', (rq, rp) => rp.send("Hi, you try to update all data object through PATCH"))

//* A TRAVÉS DE DELETE
router.delete('/', (rq, rp) => rp.send("Are you sure that you want to DELETE Data?"))



export default router;  //*Preparamos para poder importar en otros archivos este mismo