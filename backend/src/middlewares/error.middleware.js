const ApiError = require('../utils/ApiError');
const { sendError } = require('../utils/response');

/**
 * Middleware global de manejo de errores.
 * Captura cualquier error lanzado con next(error) o throw en async handlers.
 * Debe registrarse ÚLTIMO en app.js.
 */
const errorHandler = (err, req, res, next) => {
  // Errores controlados de la API
  if (err instanceof ApiError) {
    return sendError(res, err.message, err.statusCode, err.details);
  }

  // Error de clave duplicada en MySQL (email ya registrado, etc.)
  if (err.code === 'ER_DUP_ENTRY') {
    return sendError(res, 'Ya existe un registro con ese valor único (email duplicado)', 409);
  }

  // Error de validación de MySQL (campo null, tipo incorrecto, etc.)
  if (err.code === 'ER_BAD_FIELD_ERROR' || err.code === 'ER_NO_DEFAULT_FOR_FIELD') {
    return sendError(res, 'Error en los datos enviados', 400);
  }

  // Error genérico: log en consola, respuesta 500 al cliente
  console.error(`[Error] ${req.method} ${req.originalUrl}:`, err);
  return sendError(res, 'Error interno del servidor', 500);
};

/**
 * Middleware para rutas de API no encontradas.
 * Captura peticiones a /api/* que no matchearon ninguna ruta.
 */
const notFoundHandler = (req, res, next) => {
  next(ApiError.notFound(`Ruta no encontrada: ${req.method} ${req.originalUrl}`));
};

module.exports = { errorHandler, notFoundHandler };
