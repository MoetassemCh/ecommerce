const db = require("../../config/db");
class User {
  constructor(user) {
    this.email = user.email;
    this.password = user.password;
    this.role = user.role || "client";
    this.username = user.username;
  }

  static async create(newUser) {
    const query = "INSERT INTO users (email, password, role, username) VALUES (?, ?, ?, ?)";
    const [result] = await db.execute(query, [
      newUser.email,
      newUser.password,
      newUser.role,
      newUser.username
    ]);
    return { id: result.insertId, ...newUser };
  }

  static async findByEmail(email) {
    const query = "SELECT * FROM users WHERE email = ?";
    const [rows] = await db.execute(query, [email]);
    return rows[0];
  }

  static async findById(id) {
    const query = "SELECT * FROM users WHERE id = ?";
    const [rows] = await db.execute(query, [id]);
    return rows[0];
  }
}

module.exports = User;