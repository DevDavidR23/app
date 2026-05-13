require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const { errorHandler, notFoundHandler } = require('./middlewares/error.middleware');

const app = express();

// ─── CORS ─────────────────────────────────────────────────────────────────────
const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS: origen no permitido → ${origin}`));
      }
    },
    credentials: true,
  })
);

// ─── Middlewares globales ─────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Health check (público, sin auth) ────────────────────────────────────────
app.get('/api/health', async (req, res) => {
  try {
    const { pool } = require('./config/db');
    await pool.query('SELECT 1');
    res.json({
      success: true,
      status: 'ok',
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString(),
      database: 'connected',
    });
  } catch {
    res.status(503).json({
      success: false,
      status: 'error',
      timestamp: new Date().toISOString(),
      database: 'disconnected',
    });
  }
});

// ─── Rutas de la API ──────────────────────────────────────────────────────────
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/students', require('./routes/student.routes'));

// ─── 404 para rutas de API no encontradas ────────────────────────────────────
app.use('/api', notFoundHandler);

// ─── Frontend estático (React build) ─────────────────────────────────────────
const frontendPath = path.join(__dirname, '../../frontend/dist');
app.use(express.static(frontendPath));

// Cualquier ruta no-API sirve el index.html (React Router)
// Express 5 requiere wildcard con nombre: '/{*path}'
app.get('/{*path}', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// ─── Manejador global de errores (siempre al final) ──────────────────────────
app.use(errorHandler);

module.exports = app;