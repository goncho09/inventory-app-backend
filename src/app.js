import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import usuariosRoutes from './routes/usuariosRoute.js';
import productosRoutes from './routes/productosRoute.js';
import categoriasRoutes from './routes/categoriasRoute.js';
import authRoutes from './routes/authRoutes.js';
import infoRoutes from './routes/infoRoute.js';
import { authMiddleware } from './middlewares/authMiddleware.js';

const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:5173', // Cambia esto al origen de tu frontend
    credentials: true, // Permite enviar cookies y encabezados de autenticación
  })
);
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);

app.use(authMiddleware);

app.use('/api/usuarios', usuariosRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/categorias', categoriasRoutes);
app.use('/api/info', infoRoutes);

export default app;
