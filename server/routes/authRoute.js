import express from 'express';
import { registerCustomer, registerAdmin, verifyEmail, adminLogin } from '../controller/authController.js';

const router = express.Router();

// Customer Registration Route
router.post('/register/customer', registerCustomer);

// Admin Registration Route
router.post('/register/admin', registerAdmin);

// Email Verification Route
router.get('/verify-email/:token', verifyEmail);

// Admin Login Route
router.post('/login/admin', adminLogin);

export default router;
