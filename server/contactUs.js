import express from "express";
//import pg from 'pg';
import cors from "cors"; // Import cors module
import env from "dotenv";
import bodyParser from 'body-parser';
import { query } from './db.js'; // Import the query function from db.js




const app = express();
const router = express.Router();

env.config();
app.use(cors());
app.use(bodyParser.json());

/*const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
  });
  db.connect();*/
  
router.post('/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        await query('INSERT INTO contact (name, email, message) VALUES ($1, $2, $3)', [name, email, message]);//db.query
        res.status(201).send('Message sent successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error sending message');
    }
});

export default router
