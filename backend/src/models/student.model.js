class Student {
  constructor({
    id = null,
    name,
    email,
    password = null,
    created_at = null,
    updated_at = null,
  }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.createdAt = created_at;
    this.updatedAt = updated_at;
  }

  toPublic() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

module.exports = Student;