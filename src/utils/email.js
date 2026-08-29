import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_d4hi557";
const TEMPLATE_ID = "template_rlalk5z";
const PUBLIC_KEY = "0TaVPhHuiqCYxmnRv";

emailjs.init(PUBLIC_KEY);

/**
 * Send a real email notification
 * @param {string} toEmail - recipient email
 * @param {string} toName - recipient name
 * @param {string} subject - email subject
 * @param {string} message - email body message
 */
export async function sendEmail(toEmail, toName, subject, message) {
  if (!toEmail) return;
  try {
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
      to_email: toEmail,
      to_name: toName,
      subject,
      message,
    });
    console.log("Email sent to", toEmail);
  } catch (err) {
    console.error("EmailJS error:", err);
  }
}
