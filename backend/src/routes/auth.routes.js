const express = require('express');
const rateLimit = require('express-rate-limit');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { authenticate } = require('../middlewares/auth.middleware');

/**
 * Rate limiter para el endpoint de login.
 * Máximo 10 intentos por IP cada 15 minutos para prevenir fuerza bruta.
 */
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Demasiados intentos de inicio de sesión. Intenta de nuevo en 15 minutos.',
  },
});

/**
 * POST /api/auth/login  → Pública — Iniciar sesión
 * GET  /api/auth/me     → Protegida — Obtener perfil del usuario autenticado
 */
router.post('/login', loginLimiter, authController.login);
router.get('/me', authenticate, authController.me);

module.exports = router;
