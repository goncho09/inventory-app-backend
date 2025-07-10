import { Router } from 'express';
import {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  eliminarUsuario,
} from '../controllers/usuariosController.js';

const router = Router();

router.get('/', obtenerUsuarios);
router.get('/:id', obtenerUsuarioPorId);
router.post('/', crearUsuario);
router.delete('/:id', eliminarUsuario);

export default router;
