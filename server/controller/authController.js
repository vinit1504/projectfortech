import bcrypt from "bcryptjs";
import db from "../config/db.js";
import crypto from "crypto";
import { sendVerificationEmail } from "../helper/emailService.js"; // Import the email service
import dotenv from "dotenv";

dotenv.config();

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Customer Registration
export const registerCustomer = (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  // Input validation
  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({
      status: "failed",
      error: "All fields are required",
    });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      status: "failed",
      error: "Invalid email format",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      status: "failed",
      error: "Password must be at least 6 characters long",
    });
  }

  const role = "customer";
  const hashedPassword = bcrypt.hashSync(password, 10);
  const token = crypto.randomBytes(32).toString("hex"); // Generate token

  // Check if user already exists
  const checkQuery = "SELECT * FROM users WHERE email = ?";
  db.query(checkQuery, [email], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        status: "failed",
        error: "Database error. Please try again later.",
      });
    }
    if (results.length > 0) {
      return res.status(400).json({
        status: "failed",
        error: "User already exists",
      });
    }

    // Insert new user with verification token
    const insertQuery =
      "INSERT INTO users (first_name, last_name, email, password, role, verification_token) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(
      insertQuery,
      [first_name, last_name, email, hashedPassword, role, token],
      (err) => {
        if (err) {
          return res.status(500).json({
            status: "failed",
            error: "Error registering user. Please try again later.",
          });
        }

        sendVerificationEmail(email, token); // Send verification email

        return res.status(201).json({
          status: "success",
          message:
            "Customer registered successfully. Please check your email for verification.",
        });
      }
    );
  });
};

// Admin Registration
export const registerAdmin = (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  // Input validation
  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({
      status: "failed",
      error: "All fields are required",
    });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      status: "failed",
      error: "Invalid email format",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      status: "failed",
      error: "Password must be at least 6 characters long",
    });
  }

  const role = "admin";
  const hashedPassword = bcrypt.hashSync(password, 10);
  const token = crypto.randomBytes(32).toString("hex"); // Generate token

  // Check if user already exists
  const checkQuery = "SELECT * FROM users WHERE email = ?";
  db.query(checkQuery, [email], (err, results) => {
    if (err) {
      return res.status(500).json({
        status: "failed",
        error: "Database error. Please try again later.",
      });
    }
    if (results.length > 0) {
      return res.status(400).json({
        status: "failed",
        error: "User already exists",
      });
    }

    // Insert new admin with verification token
    const insertQuery =
      "INSERT INTO users (first_name, last_name, email, password, role, verification_token) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(
      insertQuery,
      [first_name, last_name, email, hashedPassword, role, token],
      (err) => {
        if (err) {
          return res.status(500).json({
            status: "failed",
            error: "Error registering admin. Please try again later.",
          });
        }

        sendVerificationEmail(email, token); // Send verification email

        return res.status(201).json({
          status: "success",
          message:
            "Admin registered successfully. Please check your email for verification.",
        });
      }
    );
  });
};

// Email Verification
export const verifyEmail = (req, res) => {
  const { token } = req.params;

  const query = "SELECT * FROM users WHERE verification_token = ?";
  db.query(query, [token], (err, results) => {
    if (err || results.length === 0) {
      return res.status(400).json({
        status: "failed",
        error: "Invalid or expired token",
      });
    }

    const user = results[0];
    if (user.is_verified) {
      return res.status(400).json({
        status: "failed",
        message: "Email already verified",
      });
    }

    const updateQuery =
      "UPDATE users SET is_verified = ?, verification_token = ? WHERE id = ?";
    db.query(updateQuery, [true, null, user.id], (err) => {
      if (err) {
        return res.status(500).json({
          status: "failed",
          error: "Failed to verify email. Please try again later.",
        });
      }

      return res.json({
        status: "success",
        message: "Email verified successfully! You can now log in.",
      });
    });
  });
};

// Admin Login
export const adminLogin = (req, res) => {
  const { email, password } = req.body;

  // Input validation
  if (!email || !password) {
    return res.status(400).json({
      status: "failed",
      error: "Email and password are required",
    });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      status: "failed",
      error: "Invalid email format",
    });
  }

  // Check if user exists
  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) {
      return res.status(500).json({
        status: "failed",
        error: "Database error. Please try again later.",
      });
    }
    if (results.length === 0) {
      return res.status(401).json({
        status: "failed",
        error: "Invalid credentials",
      });
    }

    const user = results[0];

    // Role validation
    if (user.role !== "admin") {
      return res.status(403).json({
        status: "failed",
        error: "You are not allowed to login from here",
      });
    }

    // Check if email is verified
    if (!user.is_verified) {
      return res.status(400).json({
        status: "failed",
        error: "Please verify your email first",
      });
    }

    // Password validation
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        status: "failed",
        error: "Invalid credentials",
      });
    }

    return res.json({
      status: "success",
      message: "Admin logged in successfully",
    });
  });
};
