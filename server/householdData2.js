import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import { query } from './db.js'; // Import the query function from db.js
import cors from 'cors';
import env from "dotenv";

//import { getUserId } from './Authentication.js'; // Adjust the import path
//import axios from 'axios';
//import { getUserId } from './authRoutes.js';
// Make an HTTP request to get the user ID



// Get the user ID using the function


// Now you can use the user ID as needed, such as saving it to the database


const app = express();
const port = 3003;
env.config();

app.use(cors());
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET, // Replace with your secret key
  resave: false,
  saveUninitialized: true
}));

/*app.get('/api/sessionData', (req, res) => {
    res.json({ user: req.user });
    //res.send({ user: req.user.id });
  });*/

// Route to handle saving data to database
app.post('/saveData', async (req, res) => {
    try {
      const { commonFormData, familyFormData,userId  } = req.body;
      
      // Assuming user_id is already stored in the session
      /*const userId = req.session.userId;
      console.log(userId);*/
      // Insert common form data into carbon_footprint table
      const carbonFootprintQuery = {
        text: `INSERT INTO household_common (user_id, electricity_usage, water_usage, waste_generation, gas_cylinder) 
               VALUES ($1, $2, $3, $4, $5) RETURNING id`,
        values: [userId, commonFormData.electricityUsage, commonFormData.waterUsage, commonFormData.wasteGeneration, commonFormData.gasCylinder],
      };
  
      const carbonFootprintResult = await query(carbonFootprintQuery.text, carbonFootprintQuery.values); // Use the query function
  
      // Insert family form data into family_members table
      for (const member of familyFormData) {
        const familyMembersQuery = {
          text: `INSERT INTO family_members (carbon_footprint_id, name, private_vehicle, public_vehicle, air_travel, veg_meals, non_veg_meals) 
                 VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          values: [
            carbonFootprintResult.rows[0].id,
            member.name,
            member.transportation.privateVehicle,
            member.transportation.publicVehicle,
            member.transportation.airTravel,
            member.food.vegMeals,
            member.food.nonVegMeals,
          ],
        };
  
        await query(familyMembersQuery.text, familyMembersQuery.values); // Use the query function
      }
  
      res.status(200).send('Data saved successfully');
    } catch (error) {
      console.error('Error saving data:', error);
      res.status(500).send('Error saving data');
    }
  });
  

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


