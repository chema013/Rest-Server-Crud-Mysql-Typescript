"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Producto = connection_1.default.define('productos', {
    nombre: {
        type: sequelize_1.DataTypes.STRING
    },
    precio: {
        type: sequelize_1.DataTypes.DECIMAL
    },
    fechacad: {
        type: sequelize_1.DataTypes.DATE
    },
}, {
    freezeTableName: true
});
exports.default = Producto;
//# sourceMappingURL=producto.js.map