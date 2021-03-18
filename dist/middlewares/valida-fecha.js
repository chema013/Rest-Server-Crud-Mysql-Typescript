"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validaFecha = (req, res, next) => {
    const fecha = req.expiry_date;
    if (fecha) {
        const fechaNueva = fecha.split('-').reverse().join('-');
        return fechaNueva;
    }
    next();
};
module.exports = {
    validaFecha
};
//# sourceMappingURL=valida-fecha.js.map