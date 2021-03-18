"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarios_controller_1 = require("../controllers/usuarios.controller");
const router = express_1.Router();
router.get('/:id', usuarios_controller_1.getProducto);
router.post('/', usuarios_controller_1.postProducto);
router.put('/:id', usuarios_controller_1.putProducto);
router.delete('/:id', usuarios_controller_1.deleteProducto);
exports.default = router;
//# sourceMappingURL=usuario.routes.js.map