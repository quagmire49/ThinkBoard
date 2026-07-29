import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import router from "./routes/notesRoutes.js";
import connectDB from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Correctly resolve __dirname in ES modules (points to the folder
// containing this file, i.e. backend/, regardless of the process's cwd)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS only during development
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

// Middleware
app.use(express.json());
app.use(rateLimiter);

// API routes
app.use("/api/notes", router);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  // frontend and backend are sibling folders at repo root,
  // so go up one level from backend/ to reach frontend/dist
path.join(__dirname, "..", "..", "frontend", "dist")

  app.use(express.static(frontendDistPath));

  app.get("/{*splat}", (req, res) => {
    res.sendFile(path.join(frontendDistPath, "index.html"));
  });
}

// Connect to MongoDB first, then start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started and running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });