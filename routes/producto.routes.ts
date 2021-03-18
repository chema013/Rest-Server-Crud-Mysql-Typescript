import { Router } from "express";
import { deleteProducto, getProducto, postProducto, putProducto } from "../controllers/usuarios.controller";

const router = Router();

router.get('/:id', getProducto);
router.post('/', postProducto);
router.put('/:id', putProducto);
router.delete('/:id', deleteProducto);


export default router;