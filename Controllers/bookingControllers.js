// Se importan y llaman el modelo y las librerías requeridas
const Booking = require('../Models/Booking.js')
const uuid = require('uuid')
const data = require('../data.json')
const path = require('path')
const fs = require('fs')
const { log } = require('console')

// Permite crear una nueva reserva
const newBooking = (req, res) => {
    const id = uuid.v4()
    const {
        hotel, tipoHabitacion, fechaInicio, fechaFin, estado, cantidadHuespedes
    } = req.body
    const booking = new Booking(id, hotel, tipoHabitacion, fechaInicio, fechaFin, estado, cantidadHuespedes);
    data.bookings.push(booking);
    const filePath = path.join(__dirname, '../data.json');
    fs.writeFileSync(filePath, JSON.stringify(data), 'utf8');
    res.json(booking)
}

// Permite mostrar todas las reservas
const showAllBookings = (req, res) => {
    res.json({
        message: 'Estas son todas las reservas realizadas',
        data: data.bookings
    })
}

// Permite modificar una reserva
const updateBooking = (req, res) => {
    const id = req.params.id;
    const bookingIndex = data.bookings.findIndex((booking) => String(booking.id) === String(id));
    const {hotel, tipoHabitacion, fechaInicio, fechaFin, estado, cantidadHuespedes} = req.body;
    if (bookingIndex === -1) {
        return res.status(404).json('No se encontró la reserva con el id indicado')
    }
    data.bookings[bookingIndex] = {
        ...data.bookings[bookingIndex], 
        hotel: hotel || data.bookings[bookingIndex].hotel,
        tipoHabitacion: tipoHabitacion || data.bookings[bookingIndex].tipoHabitacion,
        fechaInicio: fechaInicio || data.bookings[bookingIndex].fechaInicio,
        fechaFin: fechaFin || data.bookings[bookingIndex].fechaFin,
        estado: estado || data.bookings[bookingIndex].estado,
        cantidadHuespedes: cantidadHuespedes || data.bookings[bookingIndex].cantidadHuespedes
    } 
    const filePath = path.join(__dirname, '../data.json');
    fs.writeFileSync(filePath, JSON.stringify(data), 'utf8');
    res.json({
        message: 'Reserva actualizada con éxito',
        data: data.bookings[bookingIndex]    
    });
}

// Permite eliminar una reserva
const deleteBookingById = (req, res) => {
    const id = req.params.id;
    const bookingIndex = data.bookings.findIndex((booking) => String(booking.id) === String(id));
    if (bookingIndex === -1) {
        return res.status(404).json('No se encontró la reserva con el id indicado')
    }
    data.bookings.splice(bookingIndex, 1);
    const filePath = path.join(__dirname, '../data.json');
    fs.writeFileSync(filePath, JSON.stringify(data), 'utf8');
    res.json('Reserva eliminada con éxito')
}

// Permite filtrar una reserva por su id
const filterBookingId = (req, res) => {
    const booking = data.bookings.find(b => b.id === Number(req.params.id))
    if(!booking) {
        return res.status(404).json({error: 'No se encontró la reserva con el id indicado'})
    }
    res.json(booking)
}

// Permite filtrar las reservas realizadas a la fecha actual...
// (será necesario crear una reserva donde la fechaInicio sea la misma del día que se revise el proyecto)
const filterBookingToday = (req, res) => {
    const today = new Date().toISOString().split('T')[0];
    const filteredBookings = data.bookings.filter(b => {
        const bookingDate = new Date(b.fechaInicio).toISOString().split('T')[0];
        return bookingDate === today;
    });
    if (filteredBookings.length === 0) {
        return res.json({message: 'No se encontraron reservas para el día de hoy'});
    }
    res.json(filteredBookings);
}

// Permite filtrar las reservas por un rango de fecha
const filterBookingDateRange = (req, res) => {
    const {fechaInicio, fechaFin} = req.query
    
    if(!fechaInicio || !fechaFin) {
        return res.status(400).json('Debe ingresar un rango de fecha')
    }
    const fechaInicioFormateada = new Date(fechaInicio)
    const fechaFinFormateada = new Date(fechaFin)

    const filteredBookings = data.bookings.filter(booking => {
        const fechaInicioBooking = new Date(booking.fechaInicio)
        const fechaFinBooking = new Date(booking.fechaFin)
        return fechaInicioBooking >= fechaInicioFormateada && fechaFinBooking <= fechaFinFormateada
    })
    if (filteredBookings.length === 0) {
        return res.json({message: 'No se encontraron reservas en el rango de fechas indicado'});
    }
    res.json(filteredBookings)
}

// Permite filtrar las reservas por estado
const filterBookingStatus = (req, res) => {
    const estadoQuery = req.query.estado?.toLowerCase();
    const booking = data.bookings.filter(b => b.estado.toLowerCase() === estadoQuery);
    if(booking.length === 0) {
        return res.status(404).json({error: 'No se encontró ninguna reserva con el estado indicado'})
    }
    res.json(booking)
}

// Permite filtrar las reservas por Hotel
const filterBookingHotel = (req, res) => {
    const hotelQuery = req.query.hotel?.toLowerCase();
    const booking = data.bookings.filter(b => b.hotel.toLowerCase() === hotelQuery);
    if(booking.length === 0) {
        return res.status(404).json({error: 'No se encontró ninguna reserva en el hotel indicado'})
    }
    res.json(booking)
}

// Permite filtrar las reservas por tipo de habitación
const filterBookingRoom = (req, res) => {
    const roomQuery = req.query.tipoHabitacion?.toLowerCase();
    const booking = data.bookings.filter(b => b.tipoHabitacion.toLowerCase() === roomQuery);
    if(booking.length === 0) {
        return res.status(404).json({error: 'No se encontró ninguna reserva con el tipo de habitación indicado'})
    }
    res.json(booking)
}

// Permite filtrar las reservas por cantidad de huéspedes
const filterBookingGuests = (req, res) => {
    const guestsQuery = Number(req.query.cantidadHuespedes)
    const booking = data.bookings.filter(b => b.cantidadHuespedes > guestsQuery);
    if(booking.length === 0) {
        return res.status(404).json({error: 'No se encontró ninguna reserva con una cantidad de huéspedes mayor a la indicada'})
    }
    res.json(booking)
}

// Se exportan los controladores
module.exports = {
    newBooking,
    showAllBookings,
    updateBooking,
    deleteBookingById,
    filterBookingId,
    filterBookingToday,
    filterBookingDateRange,
    filterBookingStatus,
    filterBookingHotel,
    filterBookingRoom,
    filterBookingGuests
}