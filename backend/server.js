// backend/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import eventsRouter from "./routes/events.js";
import bookingsRouter from "./routes/bookings.js";

dotenv.config();
const app = express();

app.use(express.json());
// allow frontend origin (vite dev server)
app.use(
  cors({ origin: process.env.FRONTEND_ORIGIN || "http://localhost:5173" })
);

app.use("/api/events", eventsRouter);
app.use("/api/bookings", bookingsRouter);

// optional health
app.get("/api/ping", (req, res) => res.json({ ok: true }));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
