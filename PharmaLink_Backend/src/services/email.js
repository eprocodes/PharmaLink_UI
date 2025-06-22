
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", //process.env.EMAIL_HOST,
  port: 587,              //process.env.EMAIL_PORT,
  secure: false,          // true for port 465, false for 587
  auth: {
    user: "amjadahmadieh5@gmail.com", //process.env.EMAIL_USER,
    pass: "heyp rkzd gmni ghfy",      //process.env.EMAIL_PASS,
  },
});

async function sendResetPasswordEmail(to, name, token) {
  //const resetUrl = `${process.env.CLIENT_RESET_URL}/reset-password?token=${token}`;
  const resetUrl = `http://localhost:3000/api/auth/reset-password?token=${token}`;

  const mailOptions = {
    from: "amjadahmadieh5@gmail.com",
    to,
    subject: "PharmaLink - Reset Your Password",
    html: `
      <p>Hello ${name},</p>
      <p>You requested a password reset. Click the link below to set a new password:</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>This link will expire in 15 minutes. If you didn’t request this, please ignore it.</p>
      <p>– PharmaLink Team</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { sendResetPasswordEmail };
