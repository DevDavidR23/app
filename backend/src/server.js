require('dotenv').config();
const app = require('./app');
const { testConnection } = require('./config/db');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  // Primero verifica la conexión a la DB; si falla, el proceso termina
  await testConnection();

  app.listen(PORT, () => {
    console.log(`\n🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📚 Plataforma de inglés — Backend API`);
    console.log(`🌍 Entorno: ${process.env.NODE_ENV || 'development'}\n`);
  });
};

startServer();
