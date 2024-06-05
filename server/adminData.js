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


adminRouter.get('/user/:id', async (req, res) => {
  const userId = req.params.id;
  console.log("USERID")
  console.log(userId)
  try {
    const userResult = await query('SELECT * FROM users WHERE id = $1', [userId]);
    if (userResult.rows.length === 0) {
      return res.status(404).send('User not found');
    }

    const householdResult = await query('SELECT * FROM household_common WHERE user_id = $1', [userId]);
    const businessResult = await query('SELECT * FROM business_common WHERE user_id = $1', [userId]);
    const familyMembersResult = await query(
      'SELECT * FROM family_members WHERE household_common_id IN (SELECT id FROM household_common WHERE user_id = $1)',
      [userId]
    );

    res.status(200).json({
      user: userResult.rows[0],
      household: householdResult.rows,
      business: businessResult.rows,
      familyMembers: familyMembersResult.rows,
    });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).send('Error fetching user details');
  }
});


export default adminRouter;
