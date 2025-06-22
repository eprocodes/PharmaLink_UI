const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const db = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const pharmacyRoutes = require("./routes/pharmacyRoutes");
const customerRoutes = require("./routes/customerRoutes");
const medicationRoutes = require("./routes/medicationRoutes");
const orderRoutes = require("./routes/orderRoutes");
const broadcastRoutes = require("./routes/broadcastRoutes");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/pharmacy", pharmacyRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/medication", medicationRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/notify", broadcastRoutes);

app.get("/api/health", (req, res) => {res.json({ status: "OK", message: "Server is running" });});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
  });
});

// Database connection and server startup
async function startServer() {
  try {
    await db.query("SELECT NOW()"); // pg test query
    console.log("Connected to PostgreSQL database successfully.");

    app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`);});
  } 
  catch (error) {
    console.error("Unable to start server:", error);
    process.exit(1); // Exit the process if database connection fails
  }
}

startServer();
