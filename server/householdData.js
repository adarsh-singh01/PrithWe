import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import { query } from './db.js'; // Import the query function from db.js
import cors from 'cors';
import env from "dotenv";
import memorystore from 'memorystore';
const MemoryStore = memorystore(session);


const router = express.Router();

const app = express();

env.config();

app.use(cors());
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET, // Replace with your secret key
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 86400000 },
    store: new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    }),
}));


// Route to handle saving data to database
router.post('/saveData', async (req, res) => {
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
          text: `INSERT INTO family_members (household_common_id, name, private_vehicle, public_vehicle, air_travel, veg_meals, non_veg_meals) 
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

router.get("/entries", async (req, res) => {
  const  userId  = req.headers["user-id"];

  try {
    const result = await query(`SELECT * FROM household_common where user_id='${userId}'`);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/familyEntries/:entryId", async (req, res) => {
  const entryId = req.params.entryId;

  try {
    const result = await query("SELECT * FROM family_members WHERE household_common_id = $1", [
      entryId,
    ]);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

export default router;