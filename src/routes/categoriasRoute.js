import { Router } from 'express';
import {
  obtenerCategorias,
  obtenerCategoriaPorId,
  crearCategoria,
  borrarCategoria,
} from '../controllers/categoriasController.js';

const router = Router();

router.get('/', obtenerCategorias);
router.get('/:id', obtenerCategoriaPorId);
router.post('/', crearCategoria);
router.delete('/:id', borrarCategoria);

export default router;
