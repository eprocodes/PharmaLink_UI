
const db = require("../config/database");

const getAllMedications = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM medicine WHERE pharmacy_id = $1",
      [req.user.id]
    );
    res.json(result.rows);
  } 
  catch (error) {
    console.error("Get medications error:", error);
    res.status(500).json({ message: "Error fetching medications" });
  }
};

const getMedicationById = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM medicine WHERE id = $1 AND pharmacy_id = $2",
      [req.params.id, req.user.id]
    );

    const medication = result.rows[0];
    if (!medication) 
      return res.status(404).json({ message: "Medication not found" });

    res.json(medication);
  } 
  catch (error) {
    console.error("Get medication error:", error);
    res.status(500).json({ message: "Error fetching medication details" });
  }
};

const getMedicationByName = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) 
      return res.status(400).json({ message: "Medicine name is required" });

    const result = await db.query(
      `
      SELECT *
      FROM medicine
      WHERE LOWER(name) = LOWER($1)
        AND pharmacy_id = $2
      LIMIT 1
      `,
      [name, req.user.id]
    );

    const medication = result.rows[0];

    if (!medication)
      return res.status(404).json({ message: "Medication not found" });

    res.json(medication);
  } 
  catch (error) {
    console.error("Get medication error:", error);
    res.status(500).json({ message: "Error fetching medication details" });
  }
};

const addNewMedicine = async (req, res) => {
  try {
    const {name, generic_name, category, manufacturer, unit_price, quantity, description } = req.body;

    if (!name || !generic_name || !category || !manufacturer || !unit_price || !quantity) 
      return res.status(400).json({ message: "All required fields must be filled." });

    const result = await db.query(
      `
      INSERT INTO medicine 
        (pharmacy_id, name, generic_name, category, manufacturer, unit_price, quantity, description)
      VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id, name, generic_name, category, manufacturer, unit_price, quantity, description, created_at
      `,
      [ req.user.id, name, generic_name, category, manufacturer, unit_price, quantity, description || null ]
    );

    res.status(201).json({ message: "Medicine added successfully", medicine: result.rows[0] });
  } 
  catch (error) {
    console.error("Add new medicine error:", error);
    res.status(500).json({ message: "Error adding medicine" });
  }
};

const updateMedicine = async (req, res) => {
  try {
    const medicineId = req.params.id;
    const { name, generic_name, category, manufacturer, unit_price, quantity, description } = req.body;

    const medCheck = await db.query(
      "SELECT * FROM medicine WHERE id = $1 AND pharmacy_id = $2",
      [medicineId, req.user.id]
    );
    if (medCheck.rows.length === 0)
      return res.status(404).json({ message: "Medicine not found" });

    const result = await db.query(
      `
      UPDATE medicine
      SET name = $1,
          generic_name = $2,
          category = $3,
          manufacturer = $4,
          unit_price = $5,
          quantity = $6,
          description = $7
      WHERE id = $8 AND pharmacy_id = $9
      RETURNING id, name, generic_name, category, manufacturer, unit_price, quantity, description, created_at
      `,
      [ name, generic_name, category, manufacturer, unit_price,
         quantity, description || null, medicineId, req.user.id]
    );

    res.status(200).json({ message: "Medicine updated successfully", medicine: result.rows[0] });
  } 
  catch (error) {
    console.error("Update medicine error:", error);
    res.status(500).json({ message: "Error updating medicine" });
  }
};

const deleteMedicine = async (req, res) => {
  try {
    const check = await db.query(
      "SELECT * FROM medicine WHERE id = $1 AND pharmacy_id = $2",
      [req.params.id, req.user.id]
    );

    if (check.rows.length === 0)
      return res.status(404).json({ message: "Medicine not found" });

    await db.query("DELETE FROM medicine WHERE id = $1 AND pharmacy_id = $2", 
                    [ req.params.id, req.user.id ]
    );

    res.json({ message: "Medicine deleted successfully" });
  } 
  catch (error) {
    console.error("Delete medicine error:", error);
    res.status(500).json({ message: "Error deleting medicine" });
  }
};

module.exports = {getAllMedications, getMedicationById, getMedicationByName,
                     addNewMedicine, updateMedicine, deleteMedicine};
