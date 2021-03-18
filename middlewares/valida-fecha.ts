import { Response, Request } from "express";

const validaFecha = (req: Request, res: Response, next: any) => {
    const fecha = (req as any).expiry_date;
    if(fecha){

        const fechaNueva = fecha.split('-').reverse().join('-');
        return fechaNueva;
    }

    next();
}

module.exports = {
    validaFecha
}