/**
 * Seed script — crea el usuario demo en la base de datos.
 * Ejecutar una sola vez: node seed.js
 */
require('dotenv').config();
const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');

async function seed() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 3306,
  });

  const email = 'demo@plataforma.com';
  const plainPassword = 'Test1234!';
  const hash = await bcrypt.hash(plainPassword, 12);

  // Inserta o actualiza si ya existe
  await conn.execute(
    `INSERT INTO students (name, email, password)
     VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE password = VALUES(password)`,
    ['Estudiante Demo', email, hash]
  );

  console.log('✅ Usuario demo creado correctamente');
  console.log(`   Email    : ${email}`);
  console.log(`   Password : ${plainPassword}`);

  await conn.end();
}

seed().catch((err) => {
  console.error('❌ Error al crear el seed:', err.message);
  process.exit(1);
});
