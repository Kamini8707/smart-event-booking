// backend/routes/events.js
import express from "express";
import { pool } from "../db.js";

const router = express.Router();

// list events (supports optional q / city)
router.get("/", async (req, res) => {
  try {
    const { q, city, limit } = req.query;
    let sql =
      "SELECT id, title, description, location, date, total_seats, available_seats, price, img, city, category FROM events";
    const conditions = [];
    const params = [];

    if (q) {
      conditions.push(
        "(title LIKE ? OR description LIKE ? OR location LIKE ?)"
      );
      const like = `%${q}%`;
      params.push(like, like, like);
    }
    if (city) {
      conditions.push("city = ?");
      params.push(city);
    }
    if (conditions.length) sql += " WHERE " + conditions.join(" AND ");
    sql += " ORDER BY date ASC";
    if (limit) sql += " LIMIT " + Number(limit);

    const [rows] = await pool.query(sql, params);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM events WHERE id = ? LIMIT 1",
      [req.params.id]
    );
    if (!rows.length) return res.status(404).json({ error: "Not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
