import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';
import cors from 'cors';
import env from "dotenv";



const app = express();
const port = 3002;
env.config();



const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
  });
  db.connect();
  

app.use(cors()); // Enable CORS

app.use(bodyParser.json());

app.post('/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        await db.query('INSERT INTO contact (name, email, message) VALUES ($1, $2, $3)', [name, email, message]);
        res.status(201).send('Message sent successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error sending message');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
/*const pool = new Pool({
    user: "postgres",
  host: "localhost",
  port: 5432,
  password: "Postgres@2024",
  database: "my_database",
});*/
//const { Pool } = pkg;