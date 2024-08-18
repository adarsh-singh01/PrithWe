import pg from 'pg';
import env from 'dotenv';

env.config();

// Log the certificate and other connection details
console.log("Certificate:", process.env.PG_CERTIFICATE);
console.log("Database Connection Details:");
console.log("Host:", process.env.PG_HOST);
console.log("User:", process.env.PG_USER);
console.log("Database:", process.env.PG_DATABASE);
console.log("Port:", process.env.PG_PORT);

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  ssl: {
    require: true,
    rejectUnauthorized: true,
    ca: process.env.PG_CERTIFICATE,
  },
});

// Connect to the database
(async () => {
  try {
    console.log("Attempting to connect to the database...");
    await db.connect();
    console.log("Connected to the database successfully!");
  } catch (error) {
    console.error("Database connection error:", error);
    console.error("Error details:", {
      message: error.message,
      code: error.code,
      severity: error.severity,
      file: error.file,
      line: error.line,
      routine: error.routine,
    });
  }
})();

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

{/*import pg from 'pg';
import env from "dotenv";

env.config();

console.log("Certificate:", process.env.PG_CERTIFICATE); 


const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  ssl: {
    require:true,
    rejectUnauthorized: true,
    ca: process.env.PG_CERTIFICATE, 
  },
  //sslmode: 'require',  // This enforces SSL connection
});

// Connect to the database
;(async () => {
  try {
    await db.connect();
    console.log("Connected to the database successfully!");
  } catch (error) {
    console.error("Database connection error:", error);
  }
})();
{/*db.connect()
  .then(() => console.log("Connected to the database successfully"))
  .catch((err) => console.error('Connection error:', err.stack));
//add a comment here
// Function to perform a query
const query = async (text, params) => {
  try {
    const result = await db.query(text, params);
    return result;
  } catch (error) {
    console.error('Error executing query:', error);
  }
};

export { query };*/}
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
