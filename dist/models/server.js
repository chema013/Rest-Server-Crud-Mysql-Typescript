"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const producto_routes_1 = __importDefault(require("../routes/producto.routes"));
class Server {
    constructor() {
        this.apiPaths = {
            usuarios: '/products'
        };
        this.app = express_1.default();
        this.port = process.env.PORT || '8080';
        // Metodos iniciales
        this.middlewares();
        this.routes();
    }
    middlewares() {
        // Cors
        this.app.use(cors_1.default());
        // Lectura del body
        this.app.use(express_1.default.json());
        // Carpeta publica
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        this.app.use(this.apiPaths.usuarios, producto_routes_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servicor corriendo en el puerto ' + this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map