import { Request, Response } from "express";
import { connect } from '../db/connection';

export const getProducto = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const conn = await connect();
        const producto = await conn.query(`
        select productos.nombre as producto,productos.precio,productos.fechacad,tienda.nombre as tienda,ciudad.nombre as ciudad from tienda_producto
        inner join tienda on tienda_producto.idTienda = tienda.id
        inner join productos on tienda_producto.idProducto = productos.id
        inner join ciudad on tienda.idCiudad = ciudad.id
        where productos.id = ?
        `, [id]);
        // console.log(producto[0]);
        if ((producto[0] as any).length > 0 ) {

            res.json({
                message: 'Producto',
                producto: producto[0]
            });
        }else{
            res.json( {msg: 'El producto no existe'} );
        }

    } catch (error) {
        res.status(500).json({
            msg: error
        });
    }
}

export const postProducto = async(req: Request, res: Response) => {
    try {
        const { body } = req;
        const { name: nombre, store_id, price: precio, expiry_date: fechacad } = body;
        // voltea la fecha cad
        const fechaNueva = fechacad.split('-').reverse().join('-');
        const newProducto = {nombre, precio, fechacad: fechaNueva};

        const conn = await connect();
        const [rows] = await conn.query('INSERT INTO productos SET ?', [newProducto]);
        const id = (rows as any).insertId;

        // inserta la tabla auxiliar muchos a muchos
        tablaAuxiliar(req, res, store_id, id);

        res.json({
            message: 'Producto Creado',
            newProducto
        });

    } catch (error) {
        res.status(500).json({
            msg: error
        });
    }
}

export const putProducto = async( req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;
    const { name: nombre, price: precio, expiry_date: fechacad } = body;

    const data = {
        nombre,
        precio,
        fechacad
    }

    try {

        const conn = await connect();
        // valida que el producto exista
        const producto = await conn.query('SELECT * FROM productos WHERE id = ?', [id]);

        if ((producto[0] as any).length > 0 ) {

            await conn.query('UPDATE productos set ? WHERE id = ?', [data, id]);
            res.json({
                msg: 'Producto Actualizado',
                producto: {id,data}
            });
        }else{
            res.json( {msg: 'El producto no existe'} );
        }

    } catch (error) {

        res.status(500).json({
            msg: error
        });
    }
}

export const deleteProducto = async( req: Request, res: Response) => {

    const { id } = req.params;

    try {

        const conn = await connect();
        // valida que el producto exista
        const producto = await conn.query('SELECT * FROM productos WHERE id = ?', [id]);
        if ((producto[0] as any).length > 0 ) {
            await conn.query('DELETE FROM productos WHERE id = ?', [id]);
            res.json( {
                msg: 'Producto Eliminado',
                producto: producto[0]
            });
        }else{
            res.json( {msg: 'El producto no existe'} );
        }

    } catch (error) {
        res.status(500).json({
            msg: error
        });
    }

}

const tablaAuxiliar = async( req: Request, res: Response, data: [], idProducto: number) => {
    try {
        const conn = await connect();
        data.forEach(async(idTienda) => {
            await conn.query('INSERT INTO tienda_producto SET ?', [{ id: 0, idTienda, idProducto }]);
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: error
        });
    }
}
