import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import { query } from './db.js'; // Import the query function from db.js
import cors from 'cors';
import env from "dotenv";
import memorystore from 'memorystore';
const MemoryStore = memorystore(session); 
import { GoogleGenerativeAI } from '@google/generative-ai';
 
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
    console.log("IN SAVEDATA")
    const { commonFormData, familyFormData, userId } = req.body;

    // Insert common form data into household_common table
    const householdCommonQuery = {
      text: `INSERT INTO household_common (user_id, electricity_usage, water_usage, waste_generation, gas_cylinder) 
             VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      values: [userId, commonFormData.electricityUsage, commonFormData.waterUsage, commonFormData.wasteGeneration, commonFormData.gasCylinder],
    };

    const householdCommonResult = await query(householdCommonQuery.text, householdCommonQuery.values); // Use the query function

    // Insert family form data into family_members table
    for (const member of familyFormData) {
      const familyMembersQuery = {
        text: `INSERT INTO family_members (household_common_id, name, private_vehicle, public_vehicle, air_travel, veg_meals, non_veg_meals) 
               VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        values: [
          householdCommonResult.rows[0].id,
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

    // Generate recommendations
    const recommendationData = await recommendation(commonFormData, familyFormData, userId);

    // Insert recommendations into the recommendations table
    const recommendationQuery = {
      text: `INSERT INTO recommendations (user_id, household_common_id, recommendation) VALUES ($1, $2, $3)`,
      values: [userId, householdCommonResult.rows[0].id, recommendationData]
    };

    await query(recommendationQuery.text, recommendationQuery.values); // Use the query function

    res.status(200).send(recommendationData);
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).send('Error saving data');
  }
});

async function recommendation(commonFormData, familyFormData, userId) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


  const content = `
  User details: 
  Household data: ${JSON.stringify({
    electricity_usage: commonFormData.electricityUsage,
    water_usage: commonFormData.waterUsage,
    waste_generation: commonFormData.wasteGeneration,
    gas_cylinder: commonFormData.gasCylinder
  })}
  Family Members: ${JSON.stringify(familyFormData.map(member => ({
    name: member.name,
    private_vehicle: member.transportation.privateVehicle,
    public_vehicle: member.transportation.publicVehicle,
    air_travel: member.transportation.airTravel,
    veg_meals: member.food.vegMeals,
    non_veg_meals: member.food.nonVegMeals
  })))}
  
  personalized recommendations to reduce the carbon footprint, formatted for easy display on the frontend.

Request personalized recommendations with headings and subheadings for easy organization and readability on the frontend (in 100 words)
`;



  try {
    // Generate content using the model
    const result = await model.generateContent(content);
    const response = await result.response;
    const text = await response.text();  // Ensure we await the text conversion
    console.log(text);
    return (text);
  } catch (error) {
    // Log the error to understand what went wrong
    console.error('Error generating content:', error.message);
  }
}


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

router.get("/recommendations", async (req, res) => {
  const  userId  = req.headers["user-id"];
  try {
    const result = await query(`SELECT * FROM recommendations where user_id='${userId}'`);
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
