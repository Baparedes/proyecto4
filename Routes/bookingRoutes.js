// Se importan y llaman las librerías y controladores requeridos
const express = require('express')
const routes = express.Router()
const bookingController = require('../Controllers/bookingControllers.js')

// ----- Se crean los endpoints -----
routes.post('/', bookingController.newBooking) // Crear una reserva
routes.get('/bookings', bookingController.showAllBookings) // Mostrar todas las reservas
routes.put('/update/:id', bookingController.updateBooking) // Modificar una reserva
routes.delete('/delete/:id', bookingController.deleteBookingById) // Eliminar una reserva
routes.get('/bookings/:id', bookingController.filterBookingId) // Filtrar reserva por su id
routes.get('/today', bookingController.filterBookingToday) // Filtrar reservas por la fecha actual (hoy)
routes.get('/date', bookingController.filterBookingDateRange) // Filtrar reservas por un rango de fechas
routes.get('/status', bookingController.filterBookingStatus) // Filtrar reservas por su estado
routes.get('/hotel', bookingController.filterBookingHotel) // Filtrar reservas por Hotel
routes.get('/room', bookingController.filterBookingRoom) // Filtrar reservas por tipo de habitación
routes.get('/guests', bookingController.filterBookingGuests) // Filtrar reservas por cantidad de huéspedes

// Exportamos las rutas
module.exports = routes