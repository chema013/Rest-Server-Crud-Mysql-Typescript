"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProducto = exports.putProducto = exports.postProducto = exports.getProducto = void 0;
const connection_1 = require("../db/connection");
const getProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const conn = yield connection_1.connect();
        const producto = yield conn.query(`
        select productos.nombre as producto,productos.precio,productos.fechacad,tienda.nombre as tienda,ciudad.nombre as ciudad from tienda_producto
        inner join tienda on tienda_producto.idTienda = tienda.id
        inner join productos on tienda_producto.idProducto = productos.id
        inner join ciudad on tienda.idCiudad = ciudad.id
        where productos.id = ?
        `, [id]);
        // console.log(producto[0]);
        if (producto[0].length > 0) {
            res.json({
                message: 'Producto',
                producto: producto[0]
            });
        }
        else {
            res.json({ msg: 'El producto no existe' });
        }
    }
    catch (error) {
        res.status(500).json({
            msg: error
        });
    }
});
exports.getProducto = getProducto;
const postProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const { name: nombre, store_id, price: precio, expiry_date: fechacad } = body;
        // voltea la fecha cad
        const fechaNueva = fechacad.split('-').reverse().join('-');
        const newProducto = { nombre, precio, fechacad: fechaNueva };
        const conn = yield connection_1.connect();
        const [rows] = yield conn.query('INSERT INTO productos SET ?', [newProducto]);
        const id = rows.insertId;
        // inserta la tabla auxiliar muchos a muchos
        tablaAuxiliar(req, res, store_id, id);
        res.json({
            message: 'Producto Creado',
            newProducto
        });
    }
    catch (error) {
        res.status(500).json({
            msg: error
        });
    }
});
exports.postProducto = postProducto;
const putProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    const { name: nombre, price: precio, expiry_date: fechacad } = body;
    const data = {
        nombre,
        precio,
        fechacad
    };
    try {
        const conn = yield connection_1.connect();
        // valida que el producto exista
        const producto = yield conn.query('SELECT * FROM productos WHERE id = ?', [id]);
        if (producto[0].length > 0) {
            yield conn.query('UPDATE productos set ? WHERE id = ?', [data, id]);
            res.json({
                msg: 'Producto Actualizado',
                producto: { id, data }
            });
        }
        else {
            res.json({ msg: 'El producto no existe' });
        }
    }
    catch (error) {
        res.status(500).json({
            msg: error
        });
    }
});
exports.putProducto = putProducto;
const deleteProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const conn = yield connection_1.connect();
        // valida que el producto exista
        const producto = yield conn.query('SELECT * FROM productos WHERE id = ?', [id]);
        if (producto[0].length > 0) {
            yield conn.query('DELETE FROM productos WHERE id = ?', [id]);
            res.json({
                msg: 'Producto Eliminado',
                producto: producto[0]
            });
        }
        else {
            res.json({ msg: 'El producto no existe' });
        }
    }
    catch (error) {
        res.status(500).json({
            msg: error
        });
    }
});
exports.deleteProducto = deleteProducto;
const tablaAuxiliar = (req, res, data, idProducto) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conn = yield connection_1.connect();
        data.forEach((idTienda) => __awaiter(void 0, void 0, void 0, function* () {
            yield conn.query('INSERT INTO tienda_producto SET ?', [{ id: 0, idTienda, idProducto }]);
        }));
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: error
        });
    }
});
//# sourceMappingURL=usuarios.controller.js.map