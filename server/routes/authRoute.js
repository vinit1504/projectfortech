import express from 'express';
import { registerCustomer, registerAdmin, verifyEmail, adminLogin } from '../controller/authController.js';

const router = express.Router();

router.post('/register/customer', registerCustomer);

router.post('/register/admin', registerAdmin);

router.get('/verify-email/:token', verifyEmail);

router.post('/login/admin', adminLogin);

export default router;
