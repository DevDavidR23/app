const ApiError = require('./ApiError');

/**
 * Valida que los campos requeridos existan y no estén vacíos.
 * @param {object} body - El req.body a validar
 * @param {string[]} fields - Campos obligatorios
 */
const requireFields = (body, fields) => {
  const missing = fields.filter(
    (f) => body[f] === undefined || body[f] === null || String(body[f]).trim() === ''
  );
  if (missing.length > 0) {
    throw ApiError.badRequest(
      `Los siguientes campos son obligatorios: ${missing.join(', ')}`
    );
  }
};

/**
 * Valida formato de email básico.
 */
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw ApiError.badRequest('El formato del email no es válido');
  }
};

/**
 * Valida longitud mínima de contraseña.
 */
const validatePassword = (password, minLength = 6) => {
  if (password.length < minLength) {
    throw ApiError.badRequest(
      `La contraseña debe tener al menos ${minLength} caracteres`
    );
  }
};

module.exports = { requireFields, validateEmail, validatePassword };
