const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');


class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/users';

        //conectar a base de datos
        this.conectardb();
        
        //middlewares
        this.middlewares();

        //routes of my app
        this.routes();
    }

    async conectardb(){
       await dbConnection();
    }

    middlewares(){
        //cors
        this.app.use(cors());
        //lectura y parseo del body
        this.app.use( express.json() ); 
        //directorio publico
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/user'))
    }

    listen() {
        this.app.listen(this.port , () => {
            console.log("servidor corriendo en el puerto:", this.port);
        })
    }

}

module.exports = Server;