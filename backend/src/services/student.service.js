const bcrypt = require('bcryptjs');
const studentRepository = require('../repositories/student.repository');

class StudentService {
  async getAllStudents() {
    return await studentRepository.findAll();
  }

  async getStudentById(id) {
    const student = await studentRepository.findById(id);
    if (!student) {
      const error = new Error('Estudiante no encontrado');
      error.statusCode = 404;
      throw error;
    }
    return student;
  }

  async createStudent(data) {
    const { full_name, email, password, phone, level, active } = data;

    if (!full_name || !email || !password) {
      const error = new Error('full_name, email y password son obligatorios');
      error.statusCode = 400;
      throw error;
    }

    const exists = await studentRepository.findByEmail(email);
    if (exists) {
      const error = new Error('Ya existe un estudiante con ese email');
      error.statusCode = 400;
      throw error;
    }

    const password_hash = await bcrypt.hash(password, 10);

    return await studentRepository.create({
      full_name,
      email,
      password_hash,
      phone,
      level,
      active,
    });
  }

  async updateStudent(id, data) {
    const student = await studentRepository.findById(id);
    if (!student) {
      const error = new Error('Estudiante no encontrado');
      error.statusCode = 404;
      throw error;
    }

    const updateData = { ...data };

    if (updateData.password) {
      updateData.password_hash = await bcrypt.hash(updateData.password, 10);
      delete updateData.password;
    }

    if (updateData.email && updateData.email !== student.email) {
      const another = await studentRepository.findByEmail(updateData.email);
      if (another && another.id !== Number(id)) {
        const error = new Error('Ese email ya está en uso');
        error.statusCode = 400;
        throw error;
      }
    }

    return await studentRepository.update(id, updateData);
  }

  async deleteStudent(id) {
    const student = await studentRepository.findById(id);
    if (!student) {
      const error = new Error('Estudiante no encontrado');
      error.statusCode = 404;
      throw error;
    }

    const deleted = await studentRepository.remove(id);
    return deleted;
  }
}

module.exports = new StudentService();