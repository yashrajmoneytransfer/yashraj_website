import "dotenv/config";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import { authRouter } from "./routes/auth";
import { countryRouter } from "./routes/countries";
import { quoteRouter } from "./routes/quotes";
import { galleryRouter } from "./routes/gallery";
import { faqRouter } from "./routes/faqs";
import { serviceRouter } from "./routes/services";
import { settingsRouter } from "./routes/settings";
import { enquiryRouter } from "./routes/enquiries";
import { contactRouter } from "./routes/contact_routes";

const app = express();

const PORT = Number(process.env.API_PORT) || 5000;

app.disable("x-powered-by");

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:3001",
  "http://192.168.0.105:3000",
  "http://192.168.0.105:3001",
  "http://192.168.0.115:3000"
];

const corsOptions = {
  origin(origin: any, callback: any) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("CORS Not Allowed"));
  },

  credentials: true,

  methods: [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS",
  ],

  allowedHeaders: [
    "Content-Type",
    "Authorization",
  ],
};

// CORS MUST BE FIRST
app.use(cors(corsOptions));

// Handle Preflight
app.options("*", cors(corsOptions));

// Helmet AFTER cors
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
  })
);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API Running",
  });
});

app.use("/api/auth", authRouter);
app.use("/api/countries", countryRouter);
app.use("/api/quotes", quoteRouter);
app.use("/api/gallery", galleryRouter);
app.use("/api/faqs", faqRouter);
app.use("/api/services", serviceRouter);
app.use("/api/settings", settingsRouter);
app.use("/api/enquiries", enquiryRouter);
app.use("/api/contact", contactRouter);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

app.use((err: any, req: any, res: any, next: any) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});