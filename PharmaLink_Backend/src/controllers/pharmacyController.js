
const db = require("../config/database");

const getPharmacyProfile = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT  id, name AS full_name, email, phone, mobile_phone, address AS location, created_at AS join_date
       FROM pharmacy_account
       WHERE id = $1`,
      [req.user.id]
    );

    const profile = result.rows[0];

    if (!profile) 
      return res.status(404).json({ message: "Pharmacy not found" });

    res.status(200).json(profile);
  } 
  catch (error) {
    console.error("Get pharmacy profile error:", error);
    res.status(500).json({ message: "Error fetching profile" });
  }
};

const updatePharmacyProfile = async (req, res) => {
  try {
    const { name, email, phone, mobile_phone, address } = req.body;

    const result = await db.query(
      `UPDATE pharmacy_account
       SET name = $1, email = $2, phone = $3, mobile_phone = $4, address = $5
       WHERE id = $6
       RETURNING id, name, email, phone, mobile_phone, address, created_at`,
      [name, email, phone, mobile_phone, address, req.user.id]
    );

    res.status(200).json({ message: "Profile updated successfully", pharmacy: result.rows[0] });
  } 
  catch (error) {
    console.error("Update pharmacy profile error:", error);
    res.status(500).json({ message: "Error updating profile" });
  }
};

const getPharmacySubscriptionStatus = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT status, trial_expires_at, CURRENT_TIMESTAMP AS today
       FROM pharmacy_account
       WHERE id = $1`,
      [req.user.id]
    );

    if (result.rows.length === 0) 
      return res.status(404).json({ message: "Pharmacy not found" });

    const { status, trial_expires_at, today } = result.rows[0];

    let subscription_status = "Free Trial";
    let remaining_days = null;

    if (trial_expires_at) {
      const trialEnd = new Date(trial_expires_at);
      const now = new Date(today);
      const msDiff = trialEnd - now;
      remaining_days = Math.ceil(msDiff / (1000 * 60 * 60 * 24));

      if (remaining_days < 0) {
        subscription_status = status === 1 ? "Subscribed" : "Expired";
        remaining_days = 0;
      }
    }

    res.json({active: status === 1, subscription_status, trial_expires_at, remaining_days });
  } 
  catch (error) {
    console.error("Subscription status error:", error);
    res.status(500).json({ message: "Error retrieving subscription status" });
  }
};

const getStatistics = async (req, res) => {
  try {
    const [customerCount, medicationCount] = await Promise.all([
      db.query("SELECT COUNT(*) FROM customer WHERE pharmacy_id = $1", [req.user.id]),
      db.query("SELECT COUNT(*) FROM medicine WHERE pharmacy_id = $1", [req.user.id]),
    ]);

    res.json({
      totalCustomers: parseInt(customerCount.rows[0].count, 10),
      totalMedications: parseInt(medicationCount.rows[0].count, 10),
    });
  } 
  catch (error) {
    console.error("Get statistics error:", error);
    res.status(500).json({ message: "Error fetching pharmacy statistics" });
  }
};

module.exports = { getPharmacyProfile, updatePharmacyProfile, getPharmacySubscriptionStatus, getStatistics};
