import express from 'express'
import userRoutes from './routes/userRoutes.js'

const app = express()
const port=3000;

app.set('view engine', 'pug')
app.set('views', './views')

app.use(express.static('./src/public'))

app.use('/', './routes/userRoutes')




app.listen(port, (rq, rp) => console.log(`El servidor está funcionando en el puerto ${port}`))
