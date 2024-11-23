// Se importan y llaman las librerías y rutas requeridas
const express = require('express')
const app = express()
const bookingRoutes = require('./Routes/bookingRoutes.js')

// Se importa la librería requerida para importar las variables de entorno
require('dotenv').config()
const port = process.env.PORT || 3000
const serverUrl = process.env.SERVER_URL || `http://localhost:${port}/api/`

// Se implementan los middleware necesarios
app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))

// Se define la ruta base
app.use('/api', bookingRoutes)

// Se inicia el servidor
app.listen(port, () => {
    console.log(`Server listening to port ${port}`);
})