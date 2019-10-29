const fs = require('fs');
const { Ticket } = require('./ticket');


class TicketControl {

    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        let data = require('../data/data.json');

        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        } else {
            this.reiniciarConteo();
        }
    }

    siguiente() {
        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.grabarArchivo();

        return `Ticket ${this.ultimo}`;
    }

    getUltimoTicket() {
        return `Ticket ${this.ultimo}`;
    }

    getUltimos4() {
        return this.ultimos4;
    }

    atenderTicket(escritorio) {

        if (this.tickets.length === 0) {
            return 'No hay mas tickets';
        }

        let numeroTicket = this.tickets[0].numero;

        //Elimino la primera posición del arreglo
        this.tickets.shift();

        let atenderTicket = new Ticket(numeroTicket, escritorio);

        //coloca al inicio del arreglo el ticket
        this.ultimos4.unshift(atenderTicket);

        //Verificar que solo existan 4 tickets en el arreglo
        if (this.ultimos4.length > 4) {
            //elimina el último
            this.ultimos4.splice(-1,1);
        }

        this.grabarArchivo();

        return atenderTicket;

    }

    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];

        this.grabarArchivo();
    }

    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }

        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }

}


module.exports = {
    TicketControl
}