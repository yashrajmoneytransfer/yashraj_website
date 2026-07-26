import { Router, Request, Response } from "express";
import multer from "multer";
import { prisma } from "../lib/prisma";
import cloudinary from "../lib/cloudinary";
import {
  authenticate,
  AuthRequest,
  authorizeAdmin,
} from "../middleware/auth";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

/*
=========================================================
1. GET ALL GALLERY (Public)
=========================================================
*/
router.get("/", async (req: Request, res: Response) => {
  try {
    const gallery = await prisma.gallery.findMany({
      orderBy: {
        order: "asc",
      },
    });

    return res.status(200).json(gallery);
  } catch (error) {
    console.error("FETCH GALLERY ERROR:", error);
    return res.status(500).json({
      error: "Failed to fetch gallery",
    });
  }
});

/*
=========================================================
2. CREATE GALLERY IMAGE (Admin Only)
=========================================================
*/
router.post(
  "/",
  authenticate,
  authorizeAdmin,
  upload.single("image"),
  async (req: AuthRequest, res: Response) => {
    try {
      const { title, category, order } = req.body;

      if (!req.file) {
        return res.status(400).json({
          error: "Image required",
        });
      }

      const result: any = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "yashraj-gallery",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        stream.end(req.file!.buffer);
      });

      const gallery = await prisma.gallery.create({
        data: {
          title,
          category,
          imageUrl: result.secure_url,
          order: Number(order) || 0,
        },
      });

      return res.status(201).json({
        success: true,
        gallery,
      });
    } catch (error) {
      console.error("UPLOAD GALLERY ERROR:", error);
      return res.status(500).json({
        error: "Gallery upload failed",
      });
    }
  }
);

/*
=========================================================
3. UPDATE GALLERY (Admin Only)
=========================================================
*/
router.put(
  "/:id",
  authenticate,
  authorizeAdmin,
  async (req: AuthRequest, res: Response) => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

      const gallery = await prisma.gallery.update({
        where: {
          id: id,
        },
        data: req.body,
      });

      return res.status(200).json(gallery);
    } catch (error) {
      console.error("UPDATE GALLERY ERROR:", error);
      return res.status(500).json({
        error: "Update failed",
      });
    }
  }
);

/*
=========================================================
4. DELETE GALLERY (Admin Only)
=========================================================
*/
router.delete(
  "/:id",
  authenticate,
  authorizeAdmin,
  async (req: AuthRequest, res: Response) => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

      await prisma.gallery.delete({
        where: {
          id: id,
        },
      });

      return res.status(200).json({
        success: true,
        message: "Deleted successfully",
      });
    } catch (error) {
      console.error("DELETE GALLERY ERROR:", error);
      return res.status(500).json({
        error: "Delete failed",
      });
    }
  }
);

export { router as galleryRouter };