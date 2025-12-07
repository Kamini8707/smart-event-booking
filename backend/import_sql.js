// import_sql.js
// Run from backend folder: node import_sql.js
// This reads backend/sql/event_booking.sql and executes it on your MySQL server.

const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config();

async function run() {
  try {
    const sqlFile = path.join(__dirname, 'sql', 'event_booking.sql');
    if (!fs.existsSync(sqlFile)) {
      console.error('SQL file not found:', sqlFile);
      process.exit(1);
    }

    const sql = fs.readFileSync(sqlFile, 'utf8');
    if (!sql || sql.trim().length === 0) {
      console.error('SQL file is empty.');
      process.exit(1);
    }

    // Load DB config from .env if present, else use defaults
    const DB_HOST = process.env.DB_HOST || 'localhost';
    const DB_USER = process.env.DB_USER || 'root';
    const DB_PASSWORD = process.env.DB_PASSWORD || ''; // leave empty if no password
    const DB_NAME = process.env.DB_NAME || 'smart_event_booking';

    console.log('Connecting to DB...', { host: DB_HOST, user: DB_USER });
    const conn = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      multipleStatements: true, // allow executing many statements from the file
      // do NOT set database here so the CREATE DATABASE statement in the file works
    });

    console.log('Executing SQL file. This may take a few seconds...');
    await conn.query(sql);
    console.log('SQL executed successfully.');

    // Optionally verify DB exists
    const [rows] = await conn.query('SHOW DATABASES LIKE ?', [DB_NAME]);
    if (rows.length) {
      console.log(`Database '${DB_NAME}' is present.`);
    } else {
      console.log(`Note: Database '${DB_NAME}' was not created by the SQL (check file).`);
    }

    await conn.end();
    process.exit(0);
  } catch (err) {
    console.error('Error running SQL import:', err.message || err);
    process.exit(1);
  }
}

run();
