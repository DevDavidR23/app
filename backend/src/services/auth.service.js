const studentRepository = require('../repositories/student.repository');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');
const { requireFields, validateEmail } = require('../utils/validators');

/**
 * Servicio de Autenticación.
 * Maneja el login de estudiantes y la generación / verificación de tokens JWT.
 */
class AuthService {
  async login(email, password) {
    requireFields({ email, password }, ['email', 'password']);
    validateEmail(email);

    const student = await studentRepository.findByEmail(email.toLowerCase().trim());

    // Hash dummy para tiempo de respuesta constante (evita timing attacks)
    const dummyHash = '$2b$12$invalidhashforcomparison000000000000000000000000000000';
    const passwordToCheck = student ? student.password : dummyHash;
    const isPasswordValid = await bcrypt.compare(password, passwordToCheck);

    if (!student || !isPasswordValid) {
      throw ApiError.unauthorized('Email o contraseña incorrectos');
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw ApiError.internal('Configuración de seguridad incompleta');
    }

    const expiresIn = process.env.JWT_EXPIRES_IN || '2h';
    const payload = {
      id: student.id,
      email: student.email,
      role: 'student',
    };

    const token = jwt.sign(payload, secret, { expiresIn });

    return {
      token,
      expiresIn,
      student: student.toPublic(),
    };
  }

  /**
   * Verifica un token JWT y retorna la información del estudiante actual.
   * Usado por el endpoint GET /api/auth/me.
   */
  async getMe(userId) {
    const student = await studentRepository.findById(userId);
    if (!student) {
      throw ApiError.notFound('Estudiante no encontrado');
    }
    return student.toPublic();
  }
}

module.exports = new AuthService();
