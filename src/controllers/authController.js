import sql from '../config/db.js';
import { hash, verify } from 'argon2';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export async function logIn(req, res) {
  const { email, password } = req.body;
  try {
    const usuario = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (usuario.length === 0)
      return res.status(401).json({ message: 'Credenciales inválidas' });
    const validPassword = await verify(usuario[0].password, password);
    if (!validPassword)
      return res.status(401).json({ message: 'Credenciales inválidas' });
    const token = jwt.sign({ id: usuario[0].id }, JWT_SECRET, {
      expiresIn: '24h',
    });
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      maxAge: 24 * 60 * 60 * 1000,
    });
    req.u;
    res.json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    console.error(error); // Esto muestra el error real en consola
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
}

export async function signUp(req, res) {
  const { name, email, password, role } = req.body;
  try {
    const existingUser = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Usuario ya existe' });
    }
    const passwordHashed = await hash(password);
    await sql`INSERT INTO users (name,email, password,role) VALUES (${name},${email}, ${passwordHashed}, ${role})`;
    res.status(201).json({ message: 'Usuario creado exitosamente' });
  } catch (error) {
    console.error(error); // Esto muestra el error real en consola
    res.status(500).json({ error: 'Error al crear usuario' });
  }
}

export async function logOut(req, res) {
  console.log('Cerrando sesión');
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
    });
    res.json({ message: 'Sesión cerrada exitosamente' });
  } catch (error) {
    console.error(error); // Esto muestra el error real en consola
    res.status(500).json({ error: 'Error al cerrar sesión' });
  }
}

export async function getInfo(req, res) {
  try {
    const user = req.user; // El usuario decodificado del token
    if (!user) {
      return res.status(401).json({ message: 'No autenticado' });
    }

    const userData =
      await sql`SELECT id, name, email, role FROM users WHERE id = ${user.id}`;
    if (userData.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    const info = {
      id: userData[0].id,
      name: userData[0].name,
      email: userData[0].email,
      role: userData[0].role,
    };

    res.json({
      user: info,
    });
  } catch (error) {
    console.error(error); // Esto muestra el error real en consola
    res.status(500).json({ error: 'Error al obtener información del usuario' });
  }
}
