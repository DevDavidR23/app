const { pool } = require('../config/db');
const Student = require('../models/student.model');

class StudentRepository {
  async findAll() {
    const [rows] = await pool.query(
      `SELECT id, full_name, email, password_hash, phone, level, active, created_at, updated_at
       FROM students
       ORDER BY id DESC`
    );

    return rows.map((row) => new Student(row));
  }

  async findById(id) {
    const [rows] = await pool.query(
      `SELECT id, full_name, email, password_hash, phone, level, active, created_at, updated_at
       FROM students
       WHERE id = ?`,
      [id]
    );

    if (rows.length === 0) return null;
    return new Student(rows[0]);
  }

  async findByEmail(email) {
    const [rows] = await pool.query(
      `SELECT id, full_name, email, password_hash, phone, level, active, created_at, updated_at
       FROM students
       WHERE email = ?`,
      [email]
    );

    if (rows.length === 0) return null;
    return new Student(rows[0]);
  }

  async create(data) {
    const {
      full_name,
      email,
      password_hash,
      phone = null,
      level = null,
      active = 1,
    } = data;

    const [result] = await pool.query(
      `INSERT INTO students (full_name, email, password_hash, phone, level, active)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [full_name, email, password_hash, phone, level, active]
    );

    return await this.findById(result.insertId);
  }

  async update(id, data) {
    const current = await this.findById(id);
    if (!current) return null;

    const merged = {
      full_name: data.full_name ?? current.full_name,
      email: data.email ?? current.email,
      password_hash: data.password_hash ?? current.password_hash,
      phone: data.phone ?? current.phone,
      level: data.level ?? current.level,
      active: data.active ?? current.active,
    };

    await pool.query(
      `UPDATE students
       SET full_name = ?, email = ?, password_hash = ?, phone = ?, level = ?, active = ?
       WHERE id = ?`,
      [
        merged.full_name,
        merged.email,
        merged.password_hash,
        merged.phone,
        merged.level,
        merged.active,
        id,
      ]
    );

    return await this.findById(id);
  }

  async remove(id) {
    const [result] = await pool.query(`DELETE FROM students WHERE id = ?`, [id]);
    return result.affectedRows > 0;
  }
}

module.exports = new StudentRepository();