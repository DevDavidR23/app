/**
 * Seed script — crea múltiples usuarios de prueba en la base de datos.
 * Ejecutar con: node seed_multiple.js
 */
require('dotenv').config();
const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');

async function seedMultiple() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 3306,
  });

  const defaultPassword = 'Password123!';
  const hash = await bcrypt.hash(defaultPassword, 12);

  const users = [
    { name: 'Ana Silva', email: 'ana@ejemplo.com' },
    { name: 'Carlos Gomez', email: 'carlos@ejemplo.com' },
    { name: 'Luisa Perez', email: 'luisa@ejemplo.com' },
    { name: 'Juan Martinez', email: 'juan@ejemplo.com' },
    { name: 'Sofia Rodriguez', email: 'sofia@ejemplo.com' }
  ];

  console.log('⏳ Insertando usuarios...');

  for (const user of users) {
    await conn.execute(
      `INSERT INTO students (name, email, password)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE name = VALUES(name), password = VALUES(password)`,
      [user.name, user.email, hash]
    );
    console.log(`✅ Creado/Actualizado: ${user.name} (${user.email})`);
  }

  console.log('\n🎉 ¡Todos los usuarios fueron creados con éxito!');
  console.log(`🔑 La contraseña para todos es: ${defaultPassword}`);

  await conn.end();
}

seedMultiple().catch((err) => {
  console.error('❌ Error al insertar usuarios:', err.message);
  process.exit(1);
});
