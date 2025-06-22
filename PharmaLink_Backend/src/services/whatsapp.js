// Note: You'll need to sign up for WhatsApp Business API or use a service like Twilio

const axios = require("axios");

class WhatsAppService {
  constructor() {
    this.apiUrl = process.env.WHATSAPP_API_URL;
    this.apiToken = process.env.WHATSAPP_API_TOKEN;
  }

  /**
   * Sends a scheduled reminder that medicine will finish in 3 days.
   * @param {string} phoneNumber - The customer's phone number.
   * @param {string} customerName - The customer's full name.
   * @param {Date} reminderDate - Date the medicine is expected to run out.
   * @param {string} medicineName - The name of the medication.
   */
  async sendReminder(phoneNumber, customerName, reminderDate, medicineName) {
    try {
      const dateStr = reminderDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      const message = `Hello ${customerName}, this is your pharmacy. Your medicine "${medicineName}" will finish on ${dateStr}. Please plan for a refill if needed.`;

      const response = await axios.post(
        this.apiUrl,
        {
          phone_number: phoneNumber,
          message: message,
          type: "reminder_notification",
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      return {
        success: true,
        messageId: response.data.messageId,
      };
    } catch (error) {
      console.error("WhatsApp reminder error:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async sendBroadcastMessage(phoneNumber, customerName, messageText) {
    try {
      const message = `Hello ${customerName}, ${messageText}`;

      const response = await axios.post(
        this.apiUrl,
        {
          phone_number: phoneNumber,
          message: message,
          type: "broadcast",
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      return { success: true, messageId: response.data.messageId,};
    } 
    catch (error) {
      console.error("WhatsApp broadcast error:", error);
      return { success: false, error: error.message };
    }
  }
  
}

module.exports = new WhatsAppService();
