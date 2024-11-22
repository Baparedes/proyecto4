class Booking {
    constructor(id, hotel, tipoHabitacion, fechaInicio, fechaFin, estado, cantidadHuespedes){
        this.id = id;
        this.hotel = hotel;
        this.tipoHabitacion = tipoHabitacion;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.estado = estado;
        this.cantidadHuespedes = cantidadHuespedes;
    }}

    module.exports = Booking