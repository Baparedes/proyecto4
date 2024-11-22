const express = require('express')
const app = express()
const bookingRoutes = require('./Routes/bookingRoutes.js')

require('dotenv').config()
const port = process.env.PORT || 3000
const serverUrl = process.env.SERVER_URL || `http://localhost:${port}/api/`

app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))
app.use('/api', bookingRoutes)

app.listen(port, () => {
    console.log(`Server listening to port ${port}`);
})