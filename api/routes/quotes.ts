import { Router, Request, Response } from "express";
import nodemailer from "nodemailer";
import { prisma } from "../lib/prisma";
import { authenticate, authorizeAdmin, AuthRequest } from "../middleware/auth";

const router = Router();

// Reusable Transporter Utility Function
const createTransporter = () => {
  const host = process.env.EMAIL_HOST || "smtp.gmail.com";
  const port = Number(process.env.EMAIL_PORT) || 587;
  const emailUser = process.env.EMAIL_USER || "yashraj.transfer@gmail.com";
  const emailPass = process.env.EMAIL_PASSWORD || "wwbytumkrnkzjdhp";

  return nodemailer.createTransport({
    host: host,
    port: port,
    secure: port === 465,
    auth: {
      user: emailUser,
      pass: emailPass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
};

/*
=========================================================
1. CREATE QUOTE REQUEST (Public API)
POST /api/quotes
=========================================================
*/
router.post("/", async (req: Request, res: Response) => {
  try {
    const { 
      name, 
      mobile, 
      email, 
      country, 
      currency, 
      amount, 
      purpose,
      conversionType,
      fromCurrency,
      toCurrency,
      convertedAmount
    } = req.body;

    if (!name || !mobile || !email || !amount || !purpose) {
      return res.status(400).json({
        success: false,
        error: "Please fill all required fields.",
      });
    }

    const quote = await prisma.quoteRequest.create({
      data: {
        name: name.trim(),
        mobile: mobile.trim(),
        email: email.trim().toLowerCase(),
        country: country ? country.trim() : (toCurrency || "N/A"),
        currency: currency ? currency.trim().toUpperCase() : (toCurrency || "USD"),
        amount: Number(amount),
        purpose: purpose.trim(),
        conversionType: conversionType || null,
        fromCurrency: fromCurrency || null,
        toCurrency: toCurrency || null,
        convertedAmount: convertedAmount ? Number(convertedAmount) : null,
        status: "pending",
      },
    });

    // Send Email Notifications asynchronously
    const emailUser = process.env.EMAIL_USER || "yashraj.transfer@gmail.com";
    const transporter = createTransporter();

    // 1. Admin Email Notification
    const adminMailBody = `
New Quote Request Details:

Customer Name: ${quote.name}
Mobile Number: ${quote.mobile}
Customer Email: ${quote.email}
Country/To Currency: ${quote.country}
Currency: ${quote.currency}
Amount: ₹${Number(quote.amount).toLocaleString()}
Purpose: ${quote.purpose}
Conversion Details: ${quote.fromCurrency || "INR"} -> ${quote.toCurrency || quote.currency} (${quote.conversionType || "N/A"})
Status: ${quote.status}
Submitted Date: ${quote.createdAt.toLocaleString()}

--------------------------------
YashRaj Money Transfer Admin
`;

    const adminHtmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #1e3a8a; border-bottom: 2px solid #1e3a8a; padding-bottom: 10px;">New Quote Request</h2>
        <p style="font-size: 14px; color: #333;">You have received a new quote request from your website:</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 14px;">
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Customer Name:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${quote.name}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Mobile:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${quote.mobile}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Email:</td><td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="mailto:${quote.email}">${quote.email}</a></td></tr>
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Amount:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">₹${Number(quote.amount).toLocaleString()}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Currency Pair:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${quote.fromCurrency || "INR"} &rarr; ${quote.toCurrency || quote.currency}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Purpose:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${quote.purpose}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Status:</td><td style="padding: 8px; border-bottom: 1px solid #eee;"><span style="background: #e0f2fe; color: #0369a1; padding: 4px 8px; border-radius: 4px; font-weight: bold;">${quote.status}</span></td></tr>
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Date:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${quote.createdAt.toLocaleString()}</td></tr>
        </table>
        <br/>
        <p style="font-size: 12px; color: #888;">YashRaj Money Transfer</p>
      </div>
    `;

    // Await email dispatches so cloud environments (Render/Vercel) do not freeze TCP sockets prematurely
    try {
      await Promise.allSettled([
        transporter.sendMail({
          from: `YashRaj Money Transfer <${emailUser}>`,
          to: emailUser,
          replyTo: quote.email,
          subject: `New Quote Request - ${quote.name}`,
          text: adminMailBody,
          html: adminHtmlBody,
        }),
        transporter.sendMail({
          from: `YashRaj Money Transfer <${emailUser}>`,
          to: quote.email,
          subject: `Quote Request Received - YashRaj Money Transfer`,
          text: `Dear ${quote.name},\n\nThank you for requesting a forex quote with YashRaj Money Transfer. We have received your request for Amount: ${quote.amount} (${quote.fromCurrency || "INR"} to ${quote.toCurrency || quote.currency}).\n\nOur team will contact you shortly.\n\nBest Regards,\nYashRaj Money Transfer`,
          html: customerHtmlBody,
        }),
      ]);
      console.log("QUOTE EMAILS SENT SUCCESSFULLY");
    } catch (emailErr) {
      console.error("QUOTE EMAIL SEND ERROR:", emailErr);
    }

    return res.status(201).json({
      success: true,
      message: "Quote submitted successfully",
      quote,
    });
  } catch (error) {
    console.error("QUOTE ERROR:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to submit quote request.",
    });
  }
});

/*
=========================================================
2. CREATE CALCULATOR QUOTE REQUEST (Public API)
POST /api/quotes/calculator-quote
=========================================================
*/
router.post("/calculator-quote", async (req: Request, res: Response) => {
  try {
    const { name, mobile, email, purpose, conversionDetails, amount, toCurrency } = req.body;

    if (!name || !mobile || !email || !purpose || !amount) {
      return res.status(400).json({
        success: false,
        error: "Please fill all required fields.",
      });
    }

    const quote = await prisma.quoteRequest.create({
      data: {
        name: name.trim(),
        mobile: mobile.trim(),
        email: email.trim().toLowerCase(),
        country: toCurrency ? toCurrency.trim() : "International",
        currency: toCurrency ? toCurrency.trim().toUpperCase() : "USD",
        amount: Number(amount),
        purpose: purpose.trim(),
        status: "pending",
      },
    });

    // Send Email Notifications asynchronously
    const emailUser = process.env.EMAIL_USER || "yashraj.transfer@gmail.com";
    const transporter = createTransporter();

    const adminMailBody = `
New Calculator Quote Request:

Conversion Summary: ${conversionDetails || "N/A"}
Customer Name: ${quote.name}
Mobile Number: ${quote.mobile}
Customer Email: ${quote.email}
Amount: ₹${Number(quote.amount).toLocaleString()}
Purpose: ${quote.purpose}
Status: ${quote.status}
Submitted Date: ${quote.createdAt.toLocaleString()}

--------------------------------
YashRaj Money Transfer
`;

    try {
      await Promise.allSettled([
        transporter.sendMail({
          from: `YashRaj Calculator <${emailUser}>`,
          to: emailUser,
          replyTo: quote.email,
          subject: `Calculator Quote: ${conversionDetails || quote.name}`,
          text: adminMailBody,
        }),
        transporter.sendMail({
          from: `YashRaj Money Transfer <${emailUser}>`,
          to: quote.email,
          subject: `Calculator Quote Request Received - YashRaj Money Transfer`,
          text: `Dear ${quote.name},\n\nThank you for requesting a forex quote with YashRaj Money Transfer.\nSummary: ${conversionDetails || "Quote Request"}\n\nOur team will reach out to you shortly.\n\nBest Regards,\nYashRaj Money Transfer`,
        }),
      ]);
      console.log("CALCULATOR QUOTE EMAILS SENT SUCCESSFULLY");
    } catch (emailErr) {
      console.error("CALCULATOR QUOTE EMAIL SEND ERROR:", emailErr);
    }

    return res.status(201).json({
      success: true,
      message: "Calculator quote submitted successfully",
      quote,
    });
  } catch (error) {
    console.error("CALCULATOR QUOTE ERROR:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to submit calculator quote.",
    });
  }
});

/*
=========================================================
3. GET ALL QUOTES (Admin Only)
GET /api/quotes
=========================================================
*/
router.get("/", authenticate, authorizeAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const quotes = await prisma.quoteRequest.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      quotes,
    });
  } catch (error) {
    console.error("FETCH QUOTES ERROR:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to fetch quotes.",
    });
  }
});

/*
=========================================================
4. GET SINGLE QUOTE (Admin Only)
GET /api/quotes/:id
=========================================================
*/
router.get("/:id", authenticate, authorizeAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    const quote = await prisma.quoteRequest.findUnique({
      where: { id },
    });

    if (!quote) {
      return res.status(404).json({
        success: false,
        error: "Quote not found",
      });
    }

    return res.status(200).json({
      success: true,
      quote,
    });
  } catch (error) {
    console.error("FETCH SINGLE QUOTE ERROR:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to fetch quote",
    });
  }
});

/*
=========================================================
5. UPDATE QUOTE STATUS (Admin Only)
PUT /api/quotes/:id/status & PATCH /api/quotes/:id/status
=========================================================
*/
const updateQuoteStatusHandler = async (req: AuthRequest, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        error: "Status is required",
      });
    }

    const quote = await prisma.quoteRequest.update({
      where: { id },
      data: { status },
    });

    return res.status(200).json({
      success: true,
      message: "Status updated successfully",
      quote,
    });
  } catch (error) {
    console.error("UPDATE STATUS ERROR:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to update status",
    });
  }
};

router.put("/:id/status", authenticate, authorizeAdmin, updateQuoteStatusHandler);
router.patch("/:id/status", authenticate, authorizeAdmin, updateQuoteStatusHandler);

/*
=========================================================
6. DELETE QUOTE (Admin Only)
DELETE /api/quotes/:id
=========================================================
*/
router.delete("/:id", authenticate, authorizeAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    const deletedCount = await prisma.quoteRequest.deleteMany({
      where: { id },
    });

    if (deletedCount.count === 0) {
      return res.status(404).json({
        success: false,
        error: "Quote request not found or already deleted.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Quote deleted successfully",
    });
  } catch (error) {
    console.error("DELETE QUOTE ERROR:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to delete quote",
    });
  }
});

export { router as quoteRouter };