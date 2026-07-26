import { Router, Request, Response } from "express";
import nodemailer from "nodemailer";

const router = Router();

/*
=========================================================
CREATE CONTACT INQUIRY
PUBLIC API
POST /api/contact
=========================================================
*/
router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // 1. Check required fields
    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        error: "Please fill all required fields."
      });
    }

    // 2. Configure Nodemailer Transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.gmail.com",
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: false, // true for 465, false for 587
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Verify SMTP Connection
    await transporter.verify();

    // 3. Prepare Email Body
    const mailBody = `
New Contact Form Submission

Name: ${name.trim()}
Email: ${email.trim().toLowerCase()}
Phone: ${phone.trim()}
Subject: ${subject ? subject.trim() : "No Subject"}

Message:
${message.trim()}

--------------------------------
YashRaj Money Transfer
`;

    // 4. Send Email
    await transporter.sendMail({
      from: `"${name.trim()} via YashRaj Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email.trim(),
      subject: `New Enquiry from ${name.trim()} - ${subject || "Website Contact"}`,
      text: mailBody
    });
    return res.status(201).json({
      success: true,
      message: "Thank you! Your message has been sent successfully."
    });
    

  } catch (error) {
    console.error("CONTACT FORM ERROR:", error);

    return res.status(500).json({
      success: false,
      error: "Failed to send message. Please try again later."
    });
  }
});

export { router as contactRouter };