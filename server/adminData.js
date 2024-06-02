import express from 'express';
import { query } from './db.js'; // Import the query function from db.js

const adminRouter = express.Router();
 
adminRouter.get('/users', async (req, res) => {
  try {
    const result = await query('SELECT id, name, email, isVerified,type FROM users');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Error fetching users');
  }
});
 
adminRouter.get('/contacts', async (req, res) => {
  try {
    const result = await query('SELECT id, name, email, message FROM contact');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching contact details:', error);
    res.status(500).send('Error fetching contact details');
  }
});


export default adminRouter;
