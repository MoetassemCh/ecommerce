const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.config");

exports.signup = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({ message: "Content cannot be empty!" });
  }
  const { email, password, username, role } = req.body;

  try {
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).send({ message: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const newUser = new User({
      email,
      username,
      password: hashedPassword,
      role: role || "client",
    });

    const createdUser = await User.create(newUser);

    // 🔐 Generate token
    const token = jwt.sign(
      { id: createdUser.id, role: createdUser.role },
      authConfig.secret,
      { expiresIn: authConfig.expiresIn }
    );

    res.status(201).send({
      user: {
        id: createdUser.id,
        email: createdUser.email,
        username: createdUser.username,
        role: createdUser.role,
      },
      message: "User created successfully!",
      token, 
    });
    // Cart
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while signing up.",
    });
  }
};

exports.signin = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({ message: "Content cannot be empty!" });
  }
  const { email, password } = req.body;

  try {
    const existingUser = await User.findByEmail(email);

    if (!existingUser) {
      return res.status(404).send({ message: "User not found!" });
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid password!" });
    }

    const token = jwt.sign(
      { id: existingUser.id, role: existingUser.role },
      authConfig.secret,
      {
        expiresIn: authConfig.expiresIn,
      }
    );

    res.status(200).send({
      user: {
        id: existingUser.id,
        email: existingUser.email,
        username: existingUser.username,
        role: existingUser.role,
      },
      message: "User signed in successfully!",
      token,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while signing in.",
    });
  }
};
