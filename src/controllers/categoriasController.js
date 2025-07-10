import sql from '../config/db.js';

export async function obtenerCategorias(req, res) {
  try {
    const categorias = await sql`SELECT * FROM categories`;
    if (categorias.length === 0) {
      return res.status(404).json({ message: 'No se encontraron categorías' });
    }
    res.json(categorias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener categorías' });
  }
}
export async function obtenerCategoriaPorId(req, res) {
  const { id } = req.params;
  try {
    const categoria = await sql`SELECT * FROM categories WHERE id = ${id}`;
    if (categoria.length === 0) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.json(categoria[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la categoría' });
  }
}

export async function crearCategoria(req, res) {
  const { name } = req.body;
  try {
    const [newCategoria] = await sql`
      INSERT INTO categories (name) VALUES (${name}) RETURNING *
    `;
    res.status(201).json(newCategoria);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la categoría' });
  }
}

export async function borrarCategoria(req, res) {
  const { id } = req.params;
  try {
    const result = await sql`DELETE FROM categories WHERE id = ${id}`;
    if (result.count === 0) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al borrar la categoría' });
  }
}
