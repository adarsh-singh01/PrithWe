// server.js (Node.js/Express backend)

import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import cors from "cors"; // Import cors module
//import env from "dotenv";
import cookieParser from "cookie-parser"; // Import cookie-parser module
//import { query } from './db.js';
import householdRouter from "./householdData.js";
import contactUsRouter from "./contactUs.js";
import authRouter from "./Authentication.js";
import businessRouter from "./businessData.js";
import adminRouter from "./adminData.js";
import memorystore from 'memorystore';
const MemoryStore = memorystore(session);


const app = express();
//const port = 3001;
const port = process.env.PORT || 3001;

//env.config();

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend origin
    credentials: true,
  })
);
app.use(cookieParser()); // Add cookie-parser middleware

// Middleware setup
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set secure to false for development
    cookie: { maxAge: 86400000 },
    store: new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    }),
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

//app.use(routes)

// PostgreSQL database connection
const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
db.connect();

passport.use(
  new LocalStrategy(
    {
      usernameField: "email", // Specify the field name for the username
      passwordField: "password", // Specify the field name for the password
    },
    async function (email, password, done) {
      try {
        //console.log(req.body);
        console.log("Email:", email); // Log the email
        console.log("Password:", password); // Log the password

        const result = await db.query("SELECT * FROM users WHERE email = $1", [
          email,
        ]);

        console.log("Query Result:", result.rows); // Log the query result

        if (result.rows.length > 0) {
          const user = result.rows[0];
          const storedHashedPassword = user.password;

          // Use await with bcrypt.compare
          const valid = await bcrypt.compare(password, storedHashedPassword);

          if (valid) {
            console.log("Authentication successful:", user);
            return done(null, user);
          } else {
            console.log("Authentication failed: Invalid password");
            return done(null, false);
          }
        } else {
          console.log("Authentication failed: User not found");
          return done(null, false);
        }
      } catch (err) {
        console.error("Error during authentication:", err);
        return done(err);
      }
    }
  )
);

app.use("/api/household", householdRouter);
app.use("/api/contact", contactUsRouter);
app.use("/api/auth", authRouter);
app.use("/api/business", businessRouter);
app.use("/api/admin", adminRouter);

app.listen(port, () => console.log("App is listening"));


import path from "path"
const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "client", "dist")));
  app.get("*", (_, res) => {
    res.sendFile(path.resolve(__dirname1, "client", "dist", "index.html"));
  });
} else {
  app.get("/", (_, res) => {
    res.send("App is under development!");
  });
}