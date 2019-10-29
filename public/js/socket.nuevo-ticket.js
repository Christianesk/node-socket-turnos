//Establecer la comunicación

var socket = io();

var lblNuevoTicket = $('#lblNuevoTicket');


socket.on('connect', function () {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function () {
    console.log('Desconectado del servidor');
});

$('button').on('click', function () {

    socket.emit('siguienteTicket', null, function (siguienteTicket) {
        lblNuevoTicket.text(siguienteTicket);
    });

});

socket.on('estadoActual', function (resp) {
    lblNuevoTicket.text(resp.actual);
});

