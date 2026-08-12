import nodemailer from "nodemailer";

export interface EmailNotificationPayload {
  type: "consultation" | "application";
  name: string;
  contactNumber: string;
  email?: string;
  curriculum?: string;
  subject?: string;
  subjects?: string[];
  preferredDate?: string;
  preferredTime?: string;
  learningMode?: string;
  additionalNotes?: string;
  message?: string;
}

export async function sendEmailNotification(payload: EmailNotificationPayload) {
  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
  const recipient = process.env.NOTIFICATION_EMAIL || gmailUser || "sandanithotage@gmail.com";

  if (!gmailUser || !gmailAppPassword) {
    console.warn("Gmail SMTP credentials not set (GMAIL_USER or GMAIL_APP_PASSWORD). Skipping email dispatch.");
    return { sent: false, reason: "Gmail credentials not configured in environment" };
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailUser,
      pass: gmailAppPassword,
    },
  });

  const isConsultation = payload.type === "consultation";
  const title = isConsultation
    ? `🎓 New Consultation Request from ${payload.name}`
    : `📝 New Student Class Application from ${payload.name}`;

  const subjectList = payload.subjects && payload.subjects.length > 0
    ? payload.subjects.join(", ")
    : payload.subject || "Not specified";

  const rawPhone = payload.contactNumber.replace(/[^0-9]/g, "");

  const htmlContent = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0c1427; color: #f8fafc; padding: 32px; border-radius: 14px; max-width: 600px; margin: 0 auto; border: 1px solid rgba(212, 175, 55, 0.3);">
      <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid rgba(212, 175, 55, 0.25);">
        <h1 style="color: #d4af37; margin: 0; font-size: 26px; font-weight: 700; letter-spacing: 0.5px;">CrownEd Education</h1>
        <p style="color: #cbd5e1; margin-top: 6px; font-size: 15px; font-weight: 500;">${title}</p>
      </div>

      <div style="padding: 24px 0;">
        <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
          <tr>
            <td style="padding: 10px 0; color: #94a3b8; font-weight: 600; width: 38%;">Client / Student Name:</td>
            <td style="padding: 10px 0; color: #ffffff; font-weight: 700;">${payload.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #94a3b8; font-weight: 600;">Contact Phone:</td>
            <td style="padding: 10px 0; color: #d4af37; font-weight: 700;">
              <a href="tel:${payload.contactNumber}" style="color: #d4af37; text-decoration: none;">${payload.contactNumber}</a>
            </td>
          </tr>
          ${
            payload.email
              ? `
          <tr>
            <td style="padding: 10px 0; color: #94a3b8; font-weight: 600;">Email Address:</td>
            <td style="padding: 10px 0; color: #ffffff;">${payload.email}</td>
          </tr>`
              : ""
          }
          ${
            payload.curriculum
              ? `
          <tr>
            <td style="padding: 10px 0; color: #94a3b8; font-weight: 600;">Curriculum Stream:</td>
            <td style="padding: 10px 0; color: #ffffff;">${payload.curriculum}</td>
          </tr>`
              : ""
          }
          <tr>
            <td style="padding: 10px 0; color: #94a3b8; font-weight: 600;">Selected Subject(s):</td>
            <td style="padding: 10px 0; color: #ffffff;">${subjectList}</td>
          </tr>
          ${
            payload.learningMode
              ? `
          <tr>
            <td style="padding: 10px 0; color: #94a3b8; font-weight: 600;">Learning Mode:</td>
            <td style="padding: 10px 0; color: #ffffff;">${payload.learningMode}</td>
          </tr>`
              : ""
          }
          ${
            payload.preferredDate || payload.preferredTime
              ? `
          <tr>
            <td style="padding: 10px 0; color: #94a3b8; font-weight: 600;">Preferred Slot:</td>
            <td style="padding: 10px 0; color: #38bdf8; font-weight: 700;">${payload.preferredDate || ""} ${payload.preferredTime ? `at ${payload.preferredTime}` : ""}</td>
          </tr>`
              : ""
          }
          ${
            payload.additionalNotes || payload.message
              ? `
          <tr>
            <td style="padding: 12px 0; color: #94a3b8; font-weight: 600; vertical-align: top;">Notes / Requirements:</td>
            <td style="padding: 12px 0;">
              <div style="background: rgba(255, 255, 255, 0.06); padding: 14px; border-radius: 8px; color: #f1f5f9; border-left: 3px solid #d4af37; font-style: italic;">
                "${payload.additionalNotes || payload.message}"
              </div>
            </td>
          </tr>`
              : ""
          }
        </table>
      </div>

      <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.1); text-align: center;">
        <a href="https://wa.me/${rawPhone}" style="display: inline-block; background-color: #25d366; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 15px; box-shadow: 0 4px 14px rgba(37, 211, 102, 0.3);">
          💬 Open WhatsApp Chat with ${payload.name}
        </a>
      </div>
    </div>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"CrownEd Admissions" <${gmailUser}>`,
      to: recipient,
      subject: title,
      html: htmlContent,
    });
    console.log("Gmail notification sent successfully:", info.messageId);
    return { sent: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending Gmail SMTP notification:", error);
    return { sent: false, error };
  }
}
