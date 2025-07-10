// src/seed.js
import sql from './config/db.js';

async function seed() {
  try {
    // Limpio tablas para evitar duplicados (opcional)
    await sql`DELETE FROM products`;
    await sql`DELETE FROM categories`;
    await sql`DELETE FROM users`;

    await sql`ALTER SEQUENCE categories_id_seq RESTART WITH 1`;
    await sql`ALTER SEQUENCE products_id_seq RESTART WITH 1`;
    await sql`ALTER SEQUENCE users_id_seq RESTART WITH 1`;

    // Inserto categorías
    await sql`
      INSERT INTO categories (name) VALUES
        ('Remeras'),
        ('Pantalones'),
        ('Camperas'),
        ('Zapatillas'),
        ('Accesorios'),
        ('Buzos'),
        ('Vestidos'),
        ('Faldas')
    `;

    // Inserto products
    await sql`
      INSERT INTO products (name, description, "actualStock", price, "categoryId") VALUES
        ('Remera blanca', 'Remera básica blanca talle M', 25, 500, 1),
        ('Remera negra', 'Remera básica negra talle L', 30, 500, 1),
        ('Jean azul', 'Pantalón jean azul talle 42', 15, 1200, 2),
        ('Jogger gris', 'Jogging gris algodón talle L', 20, 1100, 2),
        ('Campera inflable', 'Campera inflable negra unisex', 10, 3500, 3),
        ('Zapatillas urbanas', 'Zapatillas blancas urbanas talle 41', 18, 4200, 4),
        ('Zapatillas deportivas', 'Zapatillas running talle 42', 12, 4600, 4),
        ('Gorra negra', 'Gorra de algodón negra', 40, 650, 5),
        ('Mochila casual', 'Mochila de tela negra para uso diario', 8, 2300, 5),
        ('Buzo con capucha', 'Buzo de algodón gris talle M', 22, 1800, 6),
        ('Vestido largo', 'Vestido elegante negro talla S', 12, 3000, 7),
        ('Falda corta', 'Falda de jean azul talle M', 18, 1500, 8)
    `;

    // Inserto usuarios
    await sql`
      INSERT INTO users (name, email, password, role) VALUES
        ('Admin', 'admin@bodega.com', 'admin123', 'admin'),
        ('Empleado 1', 'empleado1@bodega.com', 'empleado123', 'user'),
        ('Empleado 2', 'empleado2@bodega.com', 'empleado123', 'user')
    `;

    console.log('✅ Datos de prueba insertados correctamente');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al insertar datos:', error);
    process.exit(1);
  }
}

seed();
