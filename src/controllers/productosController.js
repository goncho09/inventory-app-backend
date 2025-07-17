import sql from '../config/db.js';

export async function obtenerProductos(req, res) {
  try {
    const productos = await sql`SELECT * FROM products`;
    if (productos.length === 0) {
      return res.status(404).json({ message: 'No se encontraron productos' });
    }
    res.json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
}

export async function obtenerProductoPorId(req, res) {
  const { id } = req.params;
  try {
    const producto = await sql`SELECT * FROM products WHERE id = ${id}`;
    if (producto.length === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(producto[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
}

export async function obtenerProductosFiltrados(req, res) {
  const { name, category } = req.query;
  console.log('name:', name, 'category:', category);
  if (!name && !category) {
    return res.status(400).json({ message: 'Faltan parámetros de búsqueda' });
  }
  try {
    let consulta;
    if (!name && category) consulta = sql`WHERE "categoryId" = ${category}`;
    else if (name && !category)
      consulta = sql`WHERE name ILIKE '%' || ${name} || '%'`;
    else
      consulta = sql`WHERE name ILIKE '%' || ${name} || '%' AND "categoryId" = ${category}`;

    const productos = await sql`SELECT * FROM products ${consulta}`;
    const productosArray = [...productos];
    if (productosArray.length === 0) {
      return res
        .status(404)
        .json({ message: 'No se encontraron productos con esos filtros' });
    }
    res.json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al buscar productos por nombre' });
  }
}

export async function crearProducto(req, res) {
  const { name, price, description, stock, categoria } = req.body;
  try {
    const [newProducto] = await sql`
      INSERT INTO products (name, price, description, "actualStock", "categoryId")
      VALUES (${name}, ${price}, ${description}, ${stock},  ${categoria})
      RETURNING *
    `;
    res.status(201).json(newProducto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el producto' });
  }
}

export async function borrarProducto(req, res) {
  const { id } = req.params;
  try {
    const result = await sql`DELETE FROM products WHERE id = ${id}`;
    if (result.count === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al borrar el producto' });
  }
}

export async function actualizarProducto(req, res) {
  const { id } = req.params;
  const { name, price, description, stock, categoria } = req.body;
  try {
    const [updatedProducto] = await sql`
      UPDATE products
      SET name = ${name}, price = ${price}, description = ${description}, "actualStock" = ${stock} , "categoryId" = ${categoria}
      WHERE id = ${id}
      RETURNING *
    `;
    if (!updatedProducto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(updatedProducto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
}
