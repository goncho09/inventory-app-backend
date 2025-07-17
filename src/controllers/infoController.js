import sql from '../config/db.js';

export async function getInfo(req, res) {
  try {
    const cantidadUsuarios = await sql`SELECT COUNT(*)  FROM users`;
    const cantidadProductos = await sql`SELECT COUNT(*)  FROM products`;
    const producostPocos =
      await sql`SELECT COUNT(*) FROM products WHERE "actualStock" < 5`;
    res.json({
      cantidadUsuarios: cantidadUsuarios[0],
      cantidadProductos: cantidadProductos[0],
      productosPocos: producostPocos[0],
    });
  } catch (error) {
    console.error(error); // Esto muestra el error real en consola
    res.status(500).json({ error: 'Error al obtener información' });
  }
}
