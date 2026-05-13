const studentService = require('../services/student.service');
const { sendSuccess } = require('../utils/response');

/**
 * Controlador de Estudiantes.
 * Solo coordina req → service → res.
 * Toda la lógica de negocio y errores está en el Service.
 */
class StudentController {
  async getAll(req, res, next) {
    try {
      const result = await studentService.getAllStudents(req.query);
      sendSuccess(res, result, 'Estudiantes obtenidos correctamente');
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const student = await studentService.getStudentById(req.params.id);
      sendSuccess(res, student, 'Estudiante encontrado');
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const newStudent = await studentService.createStudent(req.body);
      sendSuccess(res, newStudent, 'Estudiante creado correctamente', 201);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const updatedStudent = await studentService.updateStudent(req.params.id, req.body);
      sendSuccess(res, updatedStudent, 'Estudiante actualizado correctamente');
    } catch (error) {
      next(error);
    }
  }

  async changePassword(req, res, next) {
    try {
      const result = await studentService.changePassword(req.params.id, req.body);
      sendSuccess(res, result, result.message);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const result = await studentService.deleteStudent(req.params.id);
      sendSuccess(res, result, result.message);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new StudentController();
