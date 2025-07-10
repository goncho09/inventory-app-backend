import { Router } from 'express';
import {
  obtenerProductos,
  actualizarProducto,
  borrarProducto,
  crearProducto,
  obtenerProductoPorId,
} from '../controllers/productosController.js';

const router = Router();

router.get('/', obtenerProductos);
router.get('/:id', obtenerProductoPorId);
router.post('/', crearProducto);
router.delete('/:id', borrarProducto);
router.put('/:id', actualizarProducto);

export default router;
