import pg from 'pg';
import env from "dotenv";

env.config();

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  ssl: {
    rejectUnauthorized: true,
    ca: `${process.env.PG_CERTIFICATE}`,
  },
});

// Connect to the database
db.connect()
  .then(() => console.log("Connected to the database successfully"))
  .catch((err) => console.error('Connection error:', err.stack));

// Function to perform a query
const query = async (text, params) => {
  try {
    const result = await db.query(text, params);
    return result;
  } catch (error) {
    console.error('Error executing query:', error);
  }
};

export { query };
{/*
import pg from 'pg';
import env from "dotenv";

env.config();

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  //connectionString:process.env.CON_STRING,
  //ssl:false
  ssl: {
        rejectUnauthorized: true,
        ca: process.env.PG_CERTIFICATE,
    },
});

await db.connect();

const query = async (text, params) => {
  try {
    const result = await db.query(text, params);
    return result;
  } catch (error) {
    console.error('Error executing query:', error);
    //process.exit(1)
    //throw error;

  }
};

export { query };
*/}
