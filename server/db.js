import pg from 'pg';
import env from "dotenv";

env.config();

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,

  //connectionString:"postgres://prithwe_user:zPhSA5iPMDVZf90eIkUqwB148H7Qvujq@dpg-cotpivdjm4es73a833f0-a.oregon-postgres.render.com/prithwe"
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
