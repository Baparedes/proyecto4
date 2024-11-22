const express = require('express')
const routes = express.Router()
const bookingController = require('../Controllers/bookingControllers.js')

routes.post('/', bookingController.newBooking)
routes.get('/bookings', bookingController.showAllBookings)
routes.put('/update/:id', bookingController.updateBooking)
routes.delete('/delete/:id', bookingController.deleteBookingById)
routes.get('/bookings/:id', bookingController.filterBookingId)
routes.get('/today', bookingController.filterBookingToday)
routes.get('/date', bookingController.filterBookingDateRange)
routes.get('/status', bookingController.filterBookingStatus)
routes.get('/hotel', bookingController.filterBookingHotel)
routes.get('/room', bookingController.filterBookingRoom)
routes.get('/guests', bookingController.filterBookingGuests)

module.exports = routes