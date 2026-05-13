const { pool } = require('../config/db');
const Student = require('../models/student.model');

/**
 * Repositorio de Estudiantes.
 * Única capa que interactúa directamente con la base de datos.
 * Todos los métodos retornan instancias de Student o arrays de Student.
 */
class StudentRepository {
  /**
   * Retorna todos los estudiantes con soporte de paginación y búsqueda.
   * @param {object} options - { page, limit, search }
   */
  async findAll({ page = 1, limit = 10, search = '' } = {}) {
    const offset = (page - 1) * limit;
    const searchParam = `%${search}%`;

    // Consulta principal con filtro opcional de búsqueda
    const [rows] = await pool.query(
      `SELECT id, name, email, created_at, updated_at
       FROM students
       WHERE name LIKE ? OR email LIKE ?
       ORDER BY created_at DESC
       LIMIT ? OFFSET ?`,
      [searchParam, searchParam, limit, offset]
    );

    // Total de registros para calcular páginas
    const [[{ total }]] = await pool.query(
      'SELECT COUNT(*) AS total FROM students WHERE name LIKE ? OR email LIKE ?',
      [searchParam, searchParam]
    );

    return {
      students: rows.map((row) => new Student(row)),
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page * limit < total,
        hasPrevPage: page > 1,
      },
    };
  }

  async findById(id) {
    const [rows] = await pool.query(
      'SELECT id, name, email, created_at, updated_at FROM students WHERE id = ?',
      [id]
    );
    return rows[0] ? new Student(rows[0]) : null;
  }

  /**
   * Incluye password para que el servicio de auth pueda verificarla.
   */
  async findByEmail(email) {
    const [rows] = await pool.query(
      'SELECT id, name, email, password, created_at, updated_at FROM students WHERE email = ?',
      [email]
    );
    return rows[0] ? new Student(rows[0]) : null;
  }

  /**
   * Busca un estudiante por ID incluyendo el hash de contraseña.
   * Solo para uso interno en cambio de contraseña.
   */
  async findWithPasswordById(id) {
    const [rows] = await pool.query(
      'SELECT id, name, email, password, created_at, updated_at FROM students WHERE id = ?',
      [id]
    );
    return rows[0] ? new Student(rows[0]) : null;
  }

  async create({ name, email, password }) {
    const [result] = await pool.query(
      'INSERT INTO students (name, email, password) VALUES (?, ?, ?)',
      [name, email, password]
    );
    return new Student({
      id: result.insertId,
      name,
      email,
      password: null,
      created_at: new Date(),
      updated_at: new Date(),
    });
  }

  async update(id, { name, email }) {
    const [result] = await pool.query(
      'UPDATE students SET name = ?, email = ? WHERE id = ?',
      [name, email, id]
    );
    return result.affectedRows;
  }

  async updatePassword(id, hashedPassword) {
    const [result] = await pool.query(
      'UPDATE students SET password = ? WHERE id = ?',
      [hashedPassword, id]
    );
    return result.affectedRows;
  }

  async delete(id) {
    const [result] = await pool.query('DELETE FROM students WHERE id = ?', [id]);
    return result.affectedRows;
  }

  async existsByEmail(email, excludeId = null) {
    let query = 'SELECT id FROM students WHERE email = ?';
    const params = [email];
    if (excludeId !== null) {
      query += ' AND id != ?';
      params.push(excludeId);
    }
    const [rows] = await pool.query(query, params);
    return rows.length > 0;
  }
}

module.exports = new StudentRepository();
