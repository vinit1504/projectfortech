import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create a nodemailer transporter to send emails
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Function to send the verification email
const sendVerificationEmail = (email, token) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Email Verification",
    html: `<p>Click <a href="http://localhost:5000/api/auth/v1/verify-email/${token}">here</a> to verify your email address.</p>`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("Error sending email: ", err);
    } else {
      console.log("Verification email sent: ", info.response);
    }
  });
};

export { sendVerificationEmail };
