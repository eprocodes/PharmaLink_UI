
const jwt = require("jsonwebtoken");
const db = require("../config/database");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) 
      return res.status(401).json({ message: "Authentication required" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    let user;
    if (decoded.role === "admin") {
      const result = await db.query("SELECT * FROM admin_account WHERE id = $1", [decoded.id]);
      user = result.rows[0];
    } 
    else if (decoded.role === "pharmacist") {
      const result = await db.query("SELECT * FROM pharmacy_account WHERE id = $1", [decoded.id]);
      user = result.rows[0];
    }

    if (!user) 
      return res.status(401).json({ message: "User not found or invalid role" });

    req.user = { ...user, role: decoded.role };
    req.token = token;
    next();
  } 
  catch (error) {
    console.error("Auth error:", error);
    res.status(401).json({ message: "Please authenticate" });
  }
};

const isAdmin = async (req, res, next) => {
  if (req.user.role !== "admin") 
    return res.status(404).json({ message: "Access denied. Admin privileges required." });

  next();
};

const isPharmacist = async (req, res, next) => {
  if (req.user.role !== "pharmacist" || req.user.role !== "admin") 
    return res.status(404).json({ message: "Access denied. Pharmacist privileges required." });

  next();
};

module.exports = { auth, isAdmin, isPharmacist };
