import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const db = new pg.Client({
  connectionString: process.env.CON_STRING,
  ssl: {
    rejectUnauthorized: false, // Required for Aiven
  },
});

// Connect once when app starts
(async () => {
  try {
    console.log("Connecting to DB...");
    await db.connect();
    console.log("DB Connected ✅");
  } catch (err) {
    console.error("DB Connection Error ❌", err.message);
    process.exit(1); // stop app if DB fails
  }
})();

// Query helper
export const query = async (text, params) => {
  try {
    const result = await db.query(text, params);
    return result;
  } catch (err) {
    console.error("Query Error ❌", err.message);
    throw err;
  }
};
