import express, { Application } from 'express';
import cors from "cors";

import userRoutes from '../routes/producto.routes';

class Server {

    private app: Application;
    private port: string | undefined;
    private apiPaths = {
        usuarios: '/products'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8080';

        // Metodos iniciales
        this.middlewares();
        this.routes();
    }

    middlewares() {
        // Cors
        this.app.use( cors() );

        // Lectura del body
        this.app.use( express.json() );

        // Carpeta publica
        this.app.use( express.static('public') );
    }

    routes() {
        this.app.use( this.apiPaths.usuarios, userRoutes );
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servicor corriendo en el puerto ' + this.port);
        });
    }

}

export default Server;