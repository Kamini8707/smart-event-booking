// backend/routes/bookings.js
import express from "express";
import { pool } from "../db.js";
const router = express.Router();

// POST /api/bookings
// expects { event_id, quantity }
router.post("/", async (req, res) => {
  const { event_id, quantity } = req.body;
  if (!event_id || !quantity)
    return res.status(400).json({ error: "Missing fields" });

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    // check availability
    const [evRows] = await conn.query(
      "SELECT available_seats FROM events WHERE id = ? FOR UPDATE",
      [event_id]
    );
    if (!evRows.length) {
      await conn.rollback();
      conn.release();
      return res.status(404).json({ error: "Event not found" });
    }
    const available = Number(evRows[0].available_seats);
    if (available < quantity) {
      await conn.rollback();
      conn.release();
      return res.status(400).json({ error: "Not enough seats" });
    }

    // insert booking
    const [ins] = await conn.query(
      "INSERT INTO bookings (event_id, quantity, created_at) VALUES (?, ?, NOW())",
      [event_id, quantity]
    );

    // update available seats
    await conn.query(
      "UPDATE events SET available_seats = available_seats - ? WHERE id = ?",
      [quantity, event_id]
    );

    await conn.commit();
    conn.release();

    res.json({ bookingId: ins.insertId });
  } catch (err) {
    await conn.rollback().catch(() => {});
    conn.release();
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
