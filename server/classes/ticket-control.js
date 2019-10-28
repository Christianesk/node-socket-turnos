const fs = require('fs');

class TicketControl {

    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();

        let data = require('../data/data.json');

        if (data.hoy === this.hoy) {

        } else {
            this.reiniciarConteo();
        }
    }

    reiniciarConteo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy
        }

        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }

}


module.exports = {
    TicketControl
}