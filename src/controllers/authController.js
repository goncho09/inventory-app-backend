import sql from '../config/db.js';
import { hash, verify } from 'argon2';

export async function logIn(req, res) {
  const { email, password } = req.body;
  try {
    const usuario = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (usuario.length === 0)
      return res.status(401).json({ message: 'Credenciales inválidas' });
    const validPassword = await verify(usuario[0].password, password);
    if (!validPassword)
      return res.status(401).json({ message: 'Credenciales inválidas' });
    res.json({ message: 'Inicio de sesión exitoso', usuario: usuario[0] });
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
