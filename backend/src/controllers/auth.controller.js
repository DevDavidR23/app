const authService = require('../services/auth.service');
const { sendSuccess } = require('../utils/response');

/**
 * Controlador de Autenticación.
 * Maneja login y la consulta del usuario autenticado actual.
 */
class AuthController {
  async login(req, res, next) {
    try {
      const result = await authService.login(req.body.email, req.body.password);
      sendSuccess(res, result, 'Inicio de sesión exitoso');
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/auth/me
   * Retorna el perfil del estudiante autenticado a partir del JWT.
   * req.user es inyectado por el middleware authenticate.
   */
  async me(req, res, next) {
    try {
      const student = await authService.getMe(req.user.id);
      sendSuccess(res, student, 'Perfil obtenido correctamente');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
