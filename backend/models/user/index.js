const { DataTypes } = require("sequelize");
const db = require("../../config/db");

const User = db.sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING, // or ENUM if your column is ENUM
      defaultValue: "client",
    },
  },
  {
    tableName: "users", // this matches the actual table name in your DB
    timestamps: true, // only if your table has `createdAt` and `updatedAt`
    freezeTableName: true, // prevent Sequelize from pluralizing table name
  }
);

module.exports = User;

