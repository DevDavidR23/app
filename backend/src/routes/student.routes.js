const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student.controller');
const { authenticate } = require('../middlewares/auth.middleware');

/**
 * Rutas del CRUD de Estudiantes.
 * Todas las rutas están protegidas con el middleware de autenticación JWT.
 *
 * GET    /api/students              → Listar (con ?page=1&limit=10&search=texto)
 * GET    /api/students/:id          → Obtener por ID
 * POST   /api/students              → Crear estudiante
 * PUT    /api/students/:id          → Actualizar nombre y email
 * PATCH  /api/students/:id/password → Cambiar contraseña
 * DELETE /api/students/:id          → Eliminar estudiante
 */
router.get('/', authenticate, studentController.getAll);
router.get('/:id', authenticate, studentController.getById);
router.post('/', authenticate, studentController.create);
router.put('/:id', authenticate, studentController.update);
router.patch('/:id/password', authenticate, studentController.changePassword);
router.delete('/:id', authenticate, studentController.delete);

module.exports = router;
