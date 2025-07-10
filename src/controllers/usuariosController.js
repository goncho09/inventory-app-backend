import sql from '../config/db.js';

export async function obtenerUsuarios(req, res) {
  try {
    const usuarios = await sql`SELECT * FROM users`;
    if (usuarios.length === 0) {
      return res.status(404).json({ message: 'No se encontraron usuarios' });
    }
    res.json(usuarios);
  } catch (error) {
    console.error(error); // Esto muestra el error real en consola
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
}

export async function obtenerUsuarioPorId(req, res) {
  const { id } = req.params;
  try {
    const usuario = await sql`SELECT * FROM users WHERE id = ${id}`;
    if (usuario.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(usuario[0]);
  } catch (error) {
    console.error(error); // Esto muestra el error real en consola
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
}

export async function crearUsuario(req, res) {
  const { nombre, email, password, role } = req.body;
  try {
    const [nuevoUsuario] = await sql`
      INSERT INTO users (name, email, password, role)
      VALUES (${nombre}, ${email}, ${password}, ${role})
      RETURNING *`;
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error(error); // Esto muestra el error real en consola
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
}

export async function eliminarUsuario(req, res) {
  const { id } = req.params;
  try {
    const result = await sql`DELETE FROM users WHERE id = ${id}`;
    if (result.count === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(204).send();
  } catch (error) {
    console.error(error); // Esto muestra el error real en consola
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
}
