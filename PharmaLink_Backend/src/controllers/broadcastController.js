
const db = require("../db");
const WhatsAppService = require("../services/whatsapp");

const sendBroadcast = async (req, res) => {
  try {
    const { customerIds, message } = req.body;

    if (!Array.isArray(customerIds) || customerIds.length === 0) {
      return res.status(400).json({ message: "No customers selected" });
    }

    const result = await db.query(
      `SELECT id, name, phone FROM customer
       WHERE id = ANY($1::int[]) AND pharmacy_id = $2`,
      [customerIds, req.user.id]
    );

    const customers = result.rows;
    const responses = [];

    for (const customer of customers) {
      const response = await WhatsAppService.sendBroadcastMessage(
        customer.phone,
        customer.name,
        message
      );
      responses.push({
        customerId: customer.id,
        status: response.success ? "sent" : "failed",
        error: response.error || null,
      });
    }

    res.status(200).json({ message: "Broadcast sent", results: responses });
  } 
  catch (error) {
    console.error("Broadcast error:", error);
    res.status(500).json({ message: "Error sending broadcast" });
  }
};

module.exports = { sendBroadcast };
