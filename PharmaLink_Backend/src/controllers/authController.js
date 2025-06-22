
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const db = require("../config/database");
const { sendResetPasswordEmail } = require("../services/email");

const generateToken = (userData) => {
  return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = null;
    let role = null;

    const pharmacyResult = await db.query(
      "SELECT * FROM pharmacy_account WHERE email = $1", [email]
    );

    if (pharmacyResult.rows.length > 0) {
      user = pharmacyResult.rows[0];
      role = "pharmacist";
    } else {
      const adminResult = await db.query(
        "SELECT * FROM admin_account WHERE email = $1", [email]
      );
      if (adminResult.rows.length > 0) {
        user = adminResult.rows[0];
        role = "admin";
      }
    }

    if (!user) 
      return res.status(401).json({ message: "Invalid credentials" });

    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) 
      return res.status(401).json({ message: "Invalid credentials" });

    if (role === "pharmacist" && user.status !== 1) 
      return res.status(403).json({ message: "Account inactive. Please contact admin." });

    let token = "";
    if (role === "admin")
      token = generateToken({ id: user.id, name: user.admin_name, role });
    if (role === "pharmacist")
      token = generateToken({ id: user.id, name: user.pharmacy_name, role });

    if (role === "admin")
      res.status(200).json({token, user: { id: user.id, name: user.admin_name, role }});
    else
      res.status(200).json({token, user: { id: user.id, name: user.pharmacy_name, role }});
  } 
  catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Error during login" });
  }
};

const createPharmacy = async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ message: "Not authorized to create users" });

    const { pharmacy_name, email, phone, password } = req.body;

    const existing = await db.query(
      "SELECT * FROM pharmacy_account WHERE email = $1",
      [email]
    );

    if (existing.rows.length > 0) 
      return res.status(400).json({ message: "Pharmacy already registered" });

    const password_hash = await bcrypt.hash(password, 10);

    const result = await db.query(
      `INSERT INTO pharmacy_account (pharmacy_name, email, phone, password_hash)
       VALUES ($1, $2, $3, $4) RETURNING id, pharmacy_name, email, phone`,
      [pharmacy_name, email, phone, password_hash]
    );

    const newUser = result.rows[0];

    res.status(201).json({ message: "Pharmacy account created successfully", user: newUser });
  } 
  catch (error) {
    console.error("Create user error:", error);
    res.status(500).json({ message: "Error creating user" });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) 
      return res.status(400).json({ message: "All password fields are required." });

    if (newPassword !== confirmPassword) 
      return res.status(400).json({ message: "New password and confirmation do not match." });

    const { id, role } = req.user;

    let userQuery;
    if (role === "admin") {
      userQuery = await db.query("SELECT * FROM admin_account WHERE id = $1", [id]);
    } else if (role === "pharmacist") {
      userQuery = await db.query("SELECT * FROM pharmacy_account WHERE id = $1", [id]);
    } else {
      return res.status(403).json({ message: "Invalid user role." });
    }

    const user = userQuery.rows[0];
    if (!user) 
      return res.status(404).json({ message: "User not found." });

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password_hash);
    if (!isPasswordValid) 
      return res.status(401).json({ message: "Current password is incorrect." });

    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    if (role === "admin") {
      await db.query("UPDATE admin_account SET password_hash = $1 WHERE id = $2", [newHashedPassword, id]);
    } else {
      await db.query("UPDATE pharmacy_account SET password_hash = $1 WHERE id = $2", [newHashedPassword, id]);
    }

    res.status(200).json({ message: "Password updated successfully." });
  } 
  catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({ message: "Error changing password." });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    let user = null;
    let role = null;

    const pharmacyRes = await db.query(
      "SELECT * FROM pharmacy_account WHERE email = $1", [email]
    );
    if (pharmacyRes.rows.length > 0) {
      user = pharmacyRes.rows[0];
      role = "pharmacist";
    } else {
      const adminRes = await db.query(
        "SELECT * FROM admin_account WHERE username = $1", [email]
      );
      if (adminRes.rows.length > 0) {
        user = adminRes.rows[0];
        role = "admin";
      }
    }

    if (!user) 
      return res.status(404).json({ message: "User not found." });

    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes expiry time

    await db.query(
      `INSERT INTO password_reset_token (user_id, role, token, expires_at)
       VALUES ($1, $2, $3, $4)`,
      [user.id, role, token, expiresAt]
    );

    const resetLink = `${process.env.CLIENT_RESET_URL}/reset-password?token=${token}`;
    await sendResetPasswordEmail(user.email, user.pharmacy_name, token);

    res.json({ message: "Password reset link has been sent." });
  } 
  catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Error processing password reset." });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword, confirmPassword } = req.body;

    if (!token || !newPassword || !confirmPassword) 
      return res.status(400).json({ message: "All fields are required." });

    if (newPassword !== confirmPassword) 
      return res.status(400).json({ message: "Passwords do not match." });

    const result = await db.query(
      `SELECT * FROM password_reset_token 
       WHERE token = $1 AND expires_at > NOW()`,
      [token]
    );

    if (result.rows.length === 0) 
      return res.status(400).json({ message: "Invalid or expired token." });

    const { user_id, role } = result.rows[0];
    const hashed = await bcrypt.hash(newPassword, 10);

    if (role === "admin") {
      await db.query("UPDATE admin_account SET password_hash = $1 WHERE id = $2", [hashed, user_id]);
    } 
    else {
      await db.query("UPDATE pharmacy_account SET password_hash = $1 WHERE id = $2", [hashed, user_id]);
    }

    await db.query("DELETE FROM password_reset_token WHERE token = $1", [token]);

    res.json({ message: "Password has been reset successfully." });
  } 
  catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: "Error resetting password." });
  }
};



module.exports = { login, createPharmacy, generateToken, changePassword, forgotPassword, resetPassword };
