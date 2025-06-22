
const db = require("../config/database");
const WhatsAppService = require("../services/whatsapp");
const cron = require("node-cron");

const getAllOrders = async (req, res) => {
  try {
    const result = await db.query(
      `
      SELECT 
        o.id AS order_id,
        o.order_date,
        o.total_price,
        o.order_type,
        o.status,
        o.reminder,
        c.name AS customer_name,
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'name', m.name,
            'generic_name', m.generic_name,
            'quantity', i.quantity,
            'duration_days', i.duration_days,
            'price', i.price
          )
        ) AS medicines
      FROM medicine_order o
      JOIN customer c ON o.customer_id = c.id
      JOIN medicine_order_item i ON o.id = i.order_id
      JOIN medicine m ON i.medication_id = m.id
      WHERE c.pharmacy_id = $1
      GROUP BY o.id, c.name
      ORDER BY o.order_date DESC
      `,
      [req.user.id]
    );

    res.status(200).json(result.rows);
  } 
  catch (error) {
    console.error("Get all orders error:", error);
    res.status(500).json({ message: "Error fetching all orders" });
  }
};

const getCustomerOrder = async (req, res) => {
  try {
    const result = await db.query(
      `
      SELECT 
        o.id AS order_id,
        o.order_date,
        o.total_price,
        o.order_type,
        o.status,
        o.reminder,
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'name', m.name,
            'generic_name', m.generic_name,
            'quantity', i.quantity,
            'duration_days', i.duration_days,
            'price', i.price
          )
        ) AS medicines
      FROM medicine_order o
      JOIN customer c ON o.customer_id = c.id
      JOIN medicine_order_item i ON o.id = i.order_id
      JOIN medicine m ON i.medication_id = m.id
      WHERE o.customer_id = $1 AND c.pharmacy_id = $2
      GROUP BY o.id
      ORDER BY o.order_date DESC
      `,
      [req.params.customerId, req.user.id]
    );

    res.status(200).json(result.rows);
  } 
  catch (error) {
    console.error("Get order error:", error);
    res.status(500).json({ message: "Error fetching order" });
  }
};

const getOrderByStatus = async (req, res) => {
  try {
    const statusFilter = req.query.value; // Example: Delivered, Canceled, Pending

    // If no status provided, default to all orders
    const baseQuery = `
      SELECT 
        o.id AS order_id,
        o.order_date,
        o.total_price,
        o.order_type,
        o.status,
        o.reminder,
        c.name AS customer_name,
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'name', m.name,
            'generic_name', m.generic_name,
            'quantity', i.quantity,
            'duration_days', i.duration_days,
            'price', i.price
          )
        ) AS medicines
      FROM medicine_order o
      JOIN customer c ON o.customer_id = c.id
      JOIN medicine_order_item i ON o.id = i.order_id
      JOIN medicine m ON i.medication_id = m.id
      WHERE c.pharmacy_id = $1
    `;

    const groupBy = `GROUP BY o.id, c.name ORDER BY o.order_date DESC`;

    let result;
    if (!statusFilter || statusFilter === "All") {
      result = await db.query(`${baseQuery} ${groupBy}`, [req.user.id]);
    } else {
      result = await db.query(
        `${baseQuery} AND o.status = $2 ${groupBy}`,
        [req.user.id, statusFilter]
      );
    }

    res.status(200).json(result.rows);
  } 
  catch (error) {
    console.error("Get order by status error:", error);
    res.status(500).json({ message: "Error fetching orders by status" });
  }
};

const getOrderByMedicine = async (req, res) => {
  try {
    const medicineName = req.query.name;

    if (!medicineName) 
      return res.status(400).json({ message: "Medicine name is required" });

    const result = await db.query(
      `
      SELECT 
        o.id AS order_id,
        o.order_date,
        o.total_price,
        o.order_type,
        o.status,
        o.reminder,
        c.name AS customer_name,
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'name', m.name,
            'generic_name', m.generic_name,
            'quantity', i.quantity,
            'duration_days', i.duration_days,
            'price', i.price
          )
        ) AS medicines
      FROM medicine_order o
      JOIN customer c ON o.customer_id = c.id
      JOIN medicine_order_item i ON o.id = i.order_id
      JOIN medicine m ON i.medication_id = m.id
      WHERE c.pharmacy_id = $1
        AND LOWER(m.name) LIKE LOWER($2)
      GROUP BY o.id, c.name
      ORDER BY o.order_date DESC
      `,
      [req.user.id, `%${medicineName}%`]
    );

    res.status(200).json(result.rows);
  } 
  catch (error) {
    console.error("Search order by medicine error:", error);
    res.status(500).json({ message: "Error searching orders" });
  }
};

const createOrder = async (req, res) => {
  try {
    const {
      customerId,
      medicines, // Array: [{ medicationId, quantity, duration_days }]
      order_type,
      special_instructions,
      order_date  } = req.body;

    const orderDate = order_date ? new Date(order_date) : new Date();

    const customerRes = await db.query(
      "SELECT * FROM customer WHERE id = $1 AND pharmacy_id = $2",
      [customerId, req.user.id]
    );
    if (customerRes.rows.length === 0)
      return res.status(404).json({ message: "Customer not found" });

    const customer = customerRes.rows[0];

    let total_price = 0;
    const medicineDetails = [];

    for (const item of medicines) {
      const medRes = await db.query(
        "SELECT * FROM medicine WHERE id = $1 AND pharmacy_id = $2",
        [item.medicationId, req.user.id]
      );
      if (medRes.rows.length === 0) {
        return res.status(404).json({ message: `Medicine with ID ${item.medicationId} not found` });
      }

      const med = medRes.rows[0];
      const price = med.unit_price * item.quantity;
      total_price += price;

      medicineDetails.push({
        ...item,
        name: med.name,
        price
      });
    }

    const orderRes = await db.query(
      `INSERT INTO medicine_order
        (customer_id, total_price, order_type, status, reminder, order_date)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [customerId, total_price, order_type, "Pending", special_instructions, orderDate]
    );
    const newOrder = orderRes.rows[0];

    for (const item of medicineDetails) {
      await db.query(
        `INSERT INTO medicine_order_item
          (order_id, medication_id, quantity, duration_days, price)
         VALUES ($1, $2, $3, $4, $5)`,
        [newOrder.id, item.medicationId, item.quantity, item.duration_days, item.price]
      );

      // Schedule reminder for each medicine
      const reminderDate = new Date(orderDate);
      reminderDate.setDate(reminderDate.getDate() + item.duration_days - 3);

      const cronTime = `${reminderDate.getMinutes()} ${reminderDate.getHours()} ${reminderDate.getDate()} ${reminderDate.getMonth() + 1} *`;

      cron.schedule(cronTime, async () => {
        await WhatsAppService.sendReminder(
          customer.phone,
          customer.name,
          reminderDate,
          item.name
        );
        console.log(`Reminder sent to ${customer.name} on ${reminderDate}`);
      });
    }

    res.status(201).json({message: "Order created successfully", order: newOrder, medicines: medicineDetails});
  } 
  catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({ message: "Error creating order" });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { total_price, reminder, order_date } = req.body;

    const orderCheck = await db.query(
      `SELECT o.*
       FROM medicine_order o
       JOIN customer c ON o.customer_id = c.id
       WHERE o.id = $1 AND c.pharmacy_id = $2`,
      [req.params.id, req.user.id]
    );

    if (orderCheck.rows.length === 0) 
      return res.status(404).json({ message: "Order not found" });

    const updated = await db.query(
      `UPDATE medicine_order
       SET total_price = $1,
           reminder = $2,
           order_date = $3
       WHERE id = $4
       RETURNING id, customer_id, total_price, order_type, status, reminder, order_date`,
      [total_price, reminder, order_date, req.params.id]
    );

    res.status(200).json({
      message: "Order updated successfully",
      order: updated.rows[0]
    });
  } catch (error) {
    console.error("Update order error:", error);
    res.status(500).json({ message: "Error updating order" });
  }
};

const getOrderItem = async (req, res) => {
  try {
    const { id } = req.params;

    const orderRes = await db.query(
      `
      SELECT 
        o.id AS order_id,
        o.order_date,
        o.order_type,
        o.status,
        o.reminder,
        o.total_price,
        c.name AS customer_name,
        c.phone AS customer_phone,
        c.email AS customer_email,
        c.address AS customer_address
      FROM medicine_order o
      JOIN customer c ON o.customer_id = c.id
      WHERE o.id = $1 AND c.pharmacy_id = $2
      `,
      [id, req.user.id]
    );

    if (orderRes.rows.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    const order = orderRes.rows[0];

    const itemsRes = await db.query(
      `
      SELECT 
        m.name AS medicine,
        i.quantity,
        i.price AS unit_price,
        ROUND(i.quantity * i.price, 2) AS total
      FROM medicine_order_item i
      JOIN medicine m ON i.medication_id = m.id
      WHERE i.order_id = $1
      `,
      [id]
    );

    const items = itemsRes.rows;

    const subtotal = items.reduce((sum, item) => sum + Number(item.total), 0);
    const deliveryFee = order.order_type === "Delivery" ? 5.0 : 0;
    const grandTotal = parseFloat((subtotal + deliveryFee).toFixed(2));

    res.status(200).json({
      order_id: order.order_id,
      order_date: order.order_date,
      order_type: order.order_type,
      status: order.status,
      reminder: order.reminder,
      customer: {
        name: order.customer_name,
        phone: order.customer_phone,
        email: order.customer_email,
        address: order.customer_address
      },
      items,
      summary: {
        subtotal: parseFloat(subtotal.toFixed(2)),
        delivery_fee: deliveryFee,
        total: grandTotal
      }
    });
  } 
  catch (error) {
    console.error("Get order item error:", error);
    res.status(500).json({ message: "Error fetching order item" });
  }
};

const getCustomerOrderHistory = async (req, res) => {
  try {
    const customerId = req.params.customerId;

    const customerCheck = await db.query(
      "SELECT * FROM customer WHERE id = $1 AND pharmacy_id = $2",
      [customerId, req.user.id]
    );
    if (customerCheck.rows.length === 0) 
      return res.status(404).json({ message: "Customer not found" });

    const orders = await db.query(
      `
      SELECT 
        o.id AS order_id,
        o.order_date,
        o.total_price,
        o.order_type,
        o.status,
        o.reminder,
        JSON_AGG(m.name) AS medicines
      FROM medicine_order o
      JOIN medicine_order_item i ON o.id = i.order_id
      JOIN medicine m ON i.medication_id = m.id
      WHERE o.customer_id = $1
      GROUP BY o.id
      ORDER BY o.order_date DESC
      `,
      [customerId]
    );

    res.status(200).json(orders.rows);
  } 
  catch (error) {
    console.error("Get customer order history error:", error);
    res.status(500).json({ message: "Error fetching customer order history" });
  }
};

const getTotalOrders = async (req, res) => {
  try {
    const result = await db.query(
      `
      SELECT COUNT(*) AS total_orders
      FROM medicine_order o
      JOIN customer c ON o.customer_id = c.id
      WHERE c.pharmacy_id = $1
      `,
      [req.user.id]
    );

    res.status(200).json({ total_orders: parseInt(result.rows[0].total_orders, 10) });
  } 
  catch (error) {
    console.error("Get total orders error:", error);
    res.status(500).json({ message: "Error fetching total orders" });
  }
};


module.exports = { getAllOrders, getCustomerOrder, getOrderByStatus, getOrderByMedicine,
                   getTotalOrders, getOrderItem, getCustomerOrderHistory, createOrder, updateOrder };

/*

const handleRefillRequest = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { deliveryDate } = req.body;

    const result = await db.query(
      `SELECT o.*, c.name AS customer_name, c.phone AS customer_phone
       FROM medicine_order o
       JOIN customer c ON o.client_id = c.id
       WHERE o.id = $1 AND c.pharmacy_id = $2`,
      [orderId, req.user.id]
    );

    const order = result.rows[0];
    if (!order) 
      return res.status(404).json({ message: "Order not found" });

    if (deliveryDate) {
      await WhatsAppService.sendDeliveryConfirmation(
        order.customer_phone,
        order.customer_name,
        deliveryDate
      );
    }

    res.json({ message: "Refill request handled", deliveryDate });
  } 
  catch (error) {
    console.error("Handle refill request error:", error);
    res.status(500).json({ message: "Error handling refill request" });
  }
};

const getPendingRefillRequests = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT o.*, c.name AS customer_name, m.name AS medication_name
       FROM medicine_order o
       JOIN customer c ON o.client_id = c.id
       JOIN medicine m ON o.medication_id = m.id
       WHERE c.pharmacy_id = $1
       ORDER BY o.order_date DESC
       LIMIT 10`,
      [req.user.id]
    );

    res.json(result.rows);
  } 
  catch (error) {
    console.error("Get refill requests error:", error);
    res.status(500).json({ message: "Error fetching refill requests" });
  }
};

*/

