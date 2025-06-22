
const db = require("../config/database");

const getAllCustomers = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM customer WHERE pharmacy_id = $1", [req.user.id]);
    res.json(result.rows);
  } 
  catch (error) {
    console.error("Get customers error:", error);
    res.status(500).json({ message: "Error fetching customers" });
  }
};

const getCustomerById = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM customer WHERE id = $1 AND pharmacy_id = $2",
      [req.params.id, req.user.id]
    );

    const customer = result.rows[0];
    if (!customer)
      return res.status(404).json({ message: "Customer not found" });

    res.json(customer);
  } 
  catch (error) {
    console.error("Get customer error:", error);
    res.status(500).json({ message: "Error fetching customer details" });
  }
};

const getTotalCustomers = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT COUNT(*) AS total_customers
       FROM customer
       WHERE pharmacy_id = $1`,
      [req.user.id]
    );

    res.status(200).json({ total_customers: parseInt(result.rows[0].total_customers, 10) });
  } 
  catch (error) {
    console.error("Get total customers error:", error);
    res.status(500).json({ message: "Error fetching total customers" });
  }
};

const createCustomer = async (req, res) => {
  try {
    const { name, phone, address = null, email = null } = req.body;

    const existing = await db.query(
      "SELECT * FROM customer WHERE phone = $1 AND pharmacy_id = $2",
      [phone, req.user.id]
    );

    if (existing.rows.length > 0) 
      return res.status(400).json({ message: "Customer with this phone number already exists" });

    const result = await db.query(
      `INSERT INTO customer (name, phone, address, email, pharmacy_id)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, name, phone, address, email`,
      [name, phone, address, email, req.user.id]
    );

    res.status(201).json(result.rows[0]);
  } 
  catch (error) {
    console.error("Create customer error:", error);
    res.status(500).json({ message: "Error creating customer" });
  }
};

const updateCustomer = async (req, res) => {
  try {
    const { name, phone, address, email } = req.body;

    const customer = await db.query(
      "SELECT * FROM customer WHERE id = $1 AND pharmacy_id = $2",
      [req.params.id, req.user.id]
    );

    if (customer.rows.length === 0) 
      return res.status(404).json({ message: "Customer not found" });

    const updated = await db.query(
      `UPDATE customer
       SET name = $1, phone = $2, address = $3, email = $4
       WHERE id = $5 AND pharmacy_id = $6
       RETURNING *`,
      [name, phone, address, email, req.params.id, req.user.id]
    );

    res.json(updated.rows[0]);
  } 
  catch (error) {
    console.error("Update customer error:", error);
    res.status(500).json({ message: "Error updating customer" });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM customer WHERE id = $1 AND pharmacy_id = $2",
      [req.params.id, req.user.id]
    );

    if (result.rows.length === 0) 
      return res.status(404).json({ message: "Customer not found" });

    await db.query("DELETE FROM customer WHERE id = $1 AND pharmacy_id = $2", [req.params.id, req.user.id,]);

    res.json({ message: "Customer deleted successfully" });
  } 
  catch (error) {
    console.error("Delete customer error:", error);
    res.status(500).json({ message: "Error deleting customer" });
  }
};

module.exports = { getAllCustomers, getCustomerById, getTotalCustomers,
                   createCustomer, updateCustomer, deleteCustomer };
