CREATE DATABASE IF NOT EXISTS mvc_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE mvc_db;

CREATE TABLE IF NOT EXISTS students (
  id          INT            NOT NULL AUTO_INCREMENT,
  name        VARCHAR(100)   NOT NULL,
  email       VARCHAR(150)   NOT NULL,
  password    VARCHAR(255)   NOT NULL,
  created_at  TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (id),
  UNIQUE KEY uq_students_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── Estudiante de prueba (contraseña: Test1234!) ─────────────────────────────
-- Hash bcrypt de "Test1234!" con 12 salt rounds
INSERT INTO students (name, email, password) VALUES
  ('Estudiante Demo', 'demo@plataforma.com', '$2b$12$yG8sB0VVjX5Hnx1X.zG4yOB5PbJGM5NxA1J9OvCqZ7ZFjL5vGPOKu')
ON DUPLICATE KEY UPDATE name = name;
