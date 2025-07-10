import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import usuariosRoutes from './routes/usuariosRoute.js';
import productosRoutes from './routes/productosRoute.js';
import categoriasRoutes from './routes/categoriasRoute.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/usuarios', usuariosRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/categorias', categoriasRoutes);

export default app;
