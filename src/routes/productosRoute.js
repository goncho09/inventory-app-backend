import { Router } from 'express';
import {
  obtenerProductos,
  actualizarProducto,
  borrarProducto,
  crearProducto,
  obtenerProductoPorId,
  obtenerProductosFiltrados,
} from '../controllers/productosController.js';

const router = Router();

router.get('/', obtenerProductos);
router.get('/buscar', obtenerProductosFiltrados);
router.post('/', crearProducto);
router.get('/:id', obtenerProductoPorId);
router.delete('/:id', borrarProducto);
router.put('/:id', actualizarProducto);

export default router;
