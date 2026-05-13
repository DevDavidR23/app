const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');
const { sendError } = require('../utils/response');

/**
 * Middleware de autenticación JWT.
 * Verifica el token Bearer del header Authorization.
 * Si es válido, adjunta req.user con el payload del token.
 */
const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw ApiError.unauthorized('Token de acceso requerido');
    }

    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      console.error('[Auth Middleware] JWT_SECRET no está definido en las variables de entorno');
      throw ApiError.internal();
    }

    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return sendError(res, 'El token ha expirado, inicia sesión nuevamente', 401);
    }
    if (error.name === 'JsonWebTokenError') {
      return sendError(res, 'Token inválido', 401);
    }
    if (error instanceof ApiError) {
      return sendError(res, error.message, error.statusCode);
    }
    return sendError(res, 'Error de autenticación', 401);
  }
};

module.exports = { authenticate };
