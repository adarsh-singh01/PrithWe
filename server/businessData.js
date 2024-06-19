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

router.post('/saveData', async (req, res) => {
  try {
    const { formData, userId } = req.body;
    // const userId = req.session.userId; // Assuming user_id is already stored in the session

    // Insert form data into business_common table
    console.log(formData)
    const insertQuery = {
      text: `INSERT INTO business_common (user_id, electricity_usage, water_usage, paper_consumption, waste_generation, fuel_consumption, business_travel, created_at) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, current_timestamp) RETURNING id`,
      values: [
        userId,
        formData.Electricity_Usage,
        formData.Water_Usage,
        formData.Paper_Consumption,
        formData.Waste_Generation,
        formData.Fuel_Consumption,
        formData.Business_Travel
      ],
    };

    const businessCommonResult = await query(insertQuery.text, insertQuery.values); // Use the query function

    // Generate recommendations
    const recommendationData = await recommendation(formData);

    // Insert recommendations into the recommendations table
    const recommendationQuery = {
      text: `INSERT INTO recommendations (user_id, business_common_id, recommendation, created_at) VALUES ($1, $2, $3, current_timestamp)`,
      values: [userId, businessCommonResult.rows[0].id, recommendationData]
    };

    await query(recommendationQuery.text, recommendationQuery.values); // Use the query function

    res.status(200).send(recommendationData);
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).send('Error saving data');
  }
});


async function recommendation(formData) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


  const content = `
  Business details: 
  Business data: ${JSON.stringify({
    electricity_usage:  formData.Electricity_Usage,
    water_usage: formData.Water_Usage,
    waste_generation: formData.Waste_Generation,
    paper_generation:formData.Paper_Consumption,
    fuel_consumption: formData.Fuel_Consumption,
    business_traveel: formData.Business_Travel
  })}
  
  business recommendations to reduce the carbon footprint and increasing productivity formatted for easy display on the frontend.

Request business recommendations with headings and subheadings for easy organization and readability on the frontend.(in 100 words)
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
  const userId = req.headers["user-id"];

  try {
    const result = await query(
      `SELECT * FROM business_common where user_id='${userId}'`
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


export default router;
