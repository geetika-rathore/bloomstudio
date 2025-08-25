const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { mysqlPool } = require("../config/db");

//Register a new user
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // check if user already exists
    const [rows] = await mysqlPool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const [result] = await mysqlPool.query(
      "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
      [name, email, password_hash]
    );

    const token = jwt.sign({ id: result.insertId }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(201).json({ message: "User registered successfully", token });
  } catch (err) {
    console.error("Register Error:", err.message);
    res.status(500).send("Server error");
  }
};

// Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await mysqlPool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).send("Server error");
  }
};
