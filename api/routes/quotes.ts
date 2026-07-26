import { Router, Request, Response } from "express";
import nodemailer from "nodemailer";
import { prisma } from "../lib/prisma";
import { authenticate, authorizeAdmin, AuthRequest } from "../middleware/auth";

const router = Router();

// Reusable Transporter Utility Function
const createTransporter = () => {
  const emailUser = process.env.EMAIL_USER || "yashraj.transfer@gmail.com";
  const emailPass = process.env.EMAIL_PASSWORD || "wwbytumkrnkzjdhp";

  return nodemailer.createTransport({
    service: "gmail",
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
/* =========================================================
1. CREATE QUOTE REQUEST (Public API)
POST /api/quotes
========================================================= */
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

    // Send Email Notification asynchronously (non-blocking for fast UI response)
    const emailUser = process.env.EMAIL_USER || "yashraj.transfer@gmail.com";
    const transporter = createTransporter();
    const mailBody = `
New Quote Request

Customer Name: ${quote.name}
Mobile Number: ${quote.mobile}
Customer Email: ${quote.email}
Country/To Currency: ${quote.country}
Currency: ${quote.currency}
Amount: ${quote.amount}
Purpose: ${quote.purpose}
Conversion Details: ${quote.fromCurrency || "INR"} -> ${quote.toCurrency || quote.currency} (${quote.conversionType || "N/A"})
Status: ${quote.status}
Submitted Date: ${quote.createdAt.toLocaleString()}

--------------------------------
YashRaj Money Transfer
`;

    transporter.sendMail({
      from: `YashRaj Money Transfer <${emailUser}>`,
      to: emailUser,
      replyTo: quote.email,
      subject: `New Quote Request - ${quote.name}`,
      text: mailBody,
    })
    .then((info) => console.log("QUOTE EMAIL SENT SUCCESS:", info.response))
    .catch((emailErr) => console.error("QUOTE EMAIL SEND ERROR:", emailErr));

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

    // Send Email Notification asynchronously
    const emailUser = process.env.EMAIL_USER || "yashraj.transfer@gmail.com";
    const transporter = createTransporter();
    const mailBody = `
New Calculator Quote Request

Conversion Summary: ${conversionDetails || "N/A"}
Customer Name: ${quote.name}
Mobile Number: ${quote.mobile}
Customer Email: ${quote.email}
Purpose: ${quote.purpose}
Status: ${quote.status}
Submitted Date: ${quote.createdAt.toLocaleString()}

--------------------------------
YashRaj Money Transfer
`;

    transporter.sendMail({
      from: `YashRaj Calculator <${emailUser}>`,
      to: emailUser,
      replyTo: quote.email,
      subject: `Calculator Quote: ${conversionDetails || quote.name}`,
      text: mailBody,
    })
    .then((info) => console.log("CALCULATOR EMAIL SENT SUCCESS:", info.response))
    .catch((emailErr) => console.error("CALCULATOR EMAIL SEND ERROR:", emailErr));

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
PUT /api/quotes/:id/status
=========================================================
*/
router.put("/:id/status", authenticate, authorizeAdmin, async (req: AuthRequest, res: Response) => {
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
});

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