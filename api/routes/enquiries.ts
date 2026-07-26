import express, { Request, Response } from "express";
import { authenticate, authorizeAdmin, AuthRequest } from "../middleware/auth";
import { prisma } from "../lib/prisma";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| GET /api/enquiries - Fetch all enquiries (Admin Only)
|--------------------------------------------------------------------------
*/
router.get(
  "/",
  authenticate,
  authorizeAdmin,
  async (req: AuthRequest, res: Response) => {
    try {
      const enquiries = await prisma.enquiry.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

      return res.status(200).json({
        success: true,
        count: enquiries.length,
        data: enquiries,
      });
    } catch (error: any) {
      console.error("🔥 Error in GET /api/enquiries:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch enquiries from server",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }
);

/*
|--------------------------------------------------------------------------
| POST /api/enquiries - Create new enquiry (Public)
|--------------------------------------------------------------------------
*/
router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, email, mobile, subject, message } = req.body;

    // Basic Input Validation
    if (!name || !email || !mobile || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, mobile, and message are required fields",
      });
    }

    const newEnquiry = await prisma.enquiry.create({
      data: {
        name: String(name).trim(),
        email: String(email).trim().toLowerCase(),
        mobile: String(mobile).trim(),
        subject: subject ? String(subject).trim() : "",
        message: String(message).trim(),
      },
    });

    return res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully",
      data: newEnquiry,
    });
  } catch (error: any) {
    console.error("🔥 Error in POST /api/enquiries:", error);

    return res.status(400).json({
      success: false,
      message: "Failed to process enquiry submission",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

export { router as enquiryRouter };