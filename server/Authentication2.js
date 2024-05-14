// server.js (Node.js/Express backend)

import express, { request, response } from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';
import bcrypt from 'bcrypt';
import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import cors from 'cors'; // Import cors module
import env from "dotenv";
import cookieParser from 'cookie-parser'; // Import cookie-parser module
//import { query } from './db.js';



const app = express();
const port = 3001;
const saltRounds = 10;

env.config();


// Enable CORS
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend origin
  credentials: true,
}));
app.use(cookieParser()); // Add cookie-parser middleware

// Middleware setup
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set secure to false for development
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






// Register endpoint
app.post('/register', async (req, res) => {
  const { name,email, password,type } = req.body;

  try {
    const checkResult = await db.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      res.status(400).send('User already exists');
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error('Error hashing password:', err);
          res.status(500).send('Error registering user');
        } else {
          const result = await db.query(
            'INSERT INTO users (name,email, password,type) VALUES ($1, $2, $3,$4) RETURNING *',
            [name,email, hash,type]
          );
          const user = result.rows[0];
          res.status(201).send(user);
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Error registering user');
  }
});


app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) { return res.status(401).send('Invalid credentials'); }
    req.logIn(user, (err) => {
      if (err) { return next(err); }
      req.session.userId = user.id; // Store the user's ID in the session
      return res.status(200).send('Login successful');
    });
  })(req, res, next);
});




app.get('/login/status',
(request,response)=>{
  console.log("inside /login/status")
  console.log(request.user);
  console.log(request.user.id)//it sends the unique id i.e. UUID of the logged in user ...if not working ...try restarting client server
  console.log(request.user.type)//it outputs the type of user
  console.log(request.session);
  request.session.userId = request.user.id; // Store the user ID in the session
  //console.log(request.session.id)
  return request.user ? response.send(request.user) : response.sendStatus(401);
  
})

app.get('/user-type', (req, res) => {
  console.log("inside user type")
  req.session.userType=req.user.type
  // Retrieve user type from the session or database
  const userType = req.session.userType; // Assuming userType is stored in the session upon login
  //const userType = req.user.type
  console.log(userType)
  
  //res.json({ userType });
  return req.user ? res.send(req.user) : res.sendStatus(401);
  
});






passport.use(
  new LocalStrategy(
    {
      usernameField: 'email', // Specify the field name for the username
      passwordField: 'password', // Specify the field name for the password
    },
    async function (email, password, done) {
      try {
        //console.log(req.body);
        console.log('Email:', email); // Log the email
        console.log('Password:', password); // Log the password

        const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);

        console.log('Query Result:', result.rows); // Log the query result

        if (result.rows.length > 0) {
          const user = result.rows[0];
          const storedHashedPassword = user.password;

          // Use await with bcrypt.compare
          const valid = await bcrypt.compare(password, storedHashedPassword);

          if (valid) {
            console.log('Authentication successful:', user);
            return done(null, user);
          } else {
            console.log('Authentication failed: Invalid password');
            return done(null, false);
          }
        } else {
          console.log('Authentication failed: User not found');
          return done(null, false);
        }
      } catch (err) {
        console.error('Error during authentication:', err);
        return done(err);
      }
    }
  )
);




app.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Error logging out:', err);
      return res.sendStatus(500); // Internal server error
    }
    return res.sendStatus(200); // Success
  });
});


// Route to handle saving data to database
/*app.post('/saveData', async (req, res) => {
  try {
    const { commonFormData, familyFormData,userId  } = req.body;
    
    // Assuming user_id is already stored in the session
    const userId = req.session.userId; //comment before running
    console.log(userId); //comment before running
    // Insert common form data into carbon_footprint table
    const carbonFootprintQuery = {
      text: `INSERT INTO carbon_footprint (user_id, electricity_usage, water_usage, waste_generation, gas_cylinder) 
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
});*/







passport.serializeUser((user, done) => {
  console.log("serializeUser inside")
  console.log(user);
  
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    console.log("deserializeUser inside i am")
    console.log(id)
    const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    const user = result.rows[0];
    done(null, user);
  } catch (err) {
    console.log(err);
    done(err,null);
  }
});



// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Login endpoint (POST request)

/*app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) { return res.status(401).send('Invalid credentials'); }
    req.logIn(user, (err) => {
      if (err) { return next(err); }
      return res.status(200).send('Login successful');
    });
  })(req, res, next);
});*/

/*const userId = getUserId(req);
console.log('User ID:', userId);*/

/*app.post('/login/logout',
(request,response)=>{
  if (!request.user) return response.sendStatus(401);
  request.logout((err)=>{
    if (err) return response.sendStatus(400);
    response.send(200);
  })
})*/

/*export const getUserId = (request) => {
  return request.user ? request.user.id : null;
};*/



// Logout endpoint
/*app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});*/
/*app.post('/logout', (request,response)=>{
  if (!request.user) return response.sendStatus(401);
  request.logout((err)=>{
    if (err) return response.sendStatus(400);
    response.send(200);
  })
})*/
// Logout endpoint

//check later
/*app.get("/calculator", (req, res) => {
  if (req.isAuthenticated()) {
    res.send("You are authenticated");
    console.log(req.sessionID)
    console.log ("You are Logged in") // or whatever response you want for authenticated users
   // navigate("/calculator");
  } else {
    console.log("not logged in")
    res.redirect("/login");
    
  }
}); */

// Middleware setup

/*app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    //saveUninitialized:false,
  })
);*/
/*app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 60000 * 60,
    }
  })
);*/

/*app.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    //<Redirect to="/" />
    res.redirect("/");
  });
});*/

// Passport local strategy setup
/*passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((user, cb) => {
  cb(null, user);
});*/


/*app.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/calculator',
    failureRedirect: '/login',
    
  })
);*/
/*app.post(
  '/login',
  passport.authenticate('local'),
  (request,response)=>{response.sendStatus(200)}
);*/


/*app.get("/secrets", (req, res) => {
  // console.log(req.user);
  if (req.isAuthenticated()) {
    res.redirect("/secrets");
  } else {
    res.redirect("/login");
  }
});*/


/*app.post('/login', (req, res, next) => {
  console.log('Request body:', req.body); // Log the request body
  console.log('Request received at /login'); // Debug log
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      // Authentication failed, return error response
      console.log('Authentication failed:', info); // Debug log
      return res.status(401).send('Authentication failed');
    }
    // Authentication succeeded, return success response
    console.log('Authentication successful:', user); // Debug log
    res.status(200).send('Authentication successful');
  })(req, res, next);
});*/


/*passport.use(
  new LocalStrategy(async function verify(username, password, done) {
    try {
      console.log("Attempting to authenticate user...");
      const result = await db.query('SELECT * FROM users WHERE email = $1', [
        username,
      ]);
      console.log("User query result:", result.rows);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const storedHashedPassword = user.password;
        bcrypt.compare(password, storedHashedPassword, (err, valid) => {
          if (err) {
            console.error('Error comparing passwords:', err);
            return done(err);
          } else {
            if (valid) {
              console.log("User authenticated successfully");
              return done(null, user);
            } else {
              console.log("Invalid password");
              return done(null, false);
            }
          }
        });
      } else {
        console.log("User not found");
        return done(null, false);
      }
    } catch (err) {
      console.log('Error during authentication:', err);
      return done(err);
    }
  })
);*/



/*passport.use(
  new Strategy(async function verify (username, password, cb) {
    
    try {
      console.log("entered strategy")
      const result = await db.query('SELECT * FROM users WHERE email = $1', [
        username,
      ]);

      if (result.rows.length > 0) {
        const user = result.rows[0];
        const storedHashedPassword = user.password;
        bcrypt.compare(password, storedHashedPassword, (err, valid) => {
          if (err) {
            //Error with password check
            console.error("Error comparing passwords:", err);
            return cb(err);
          } else {
            if (valid) {
              //Passed password check
              return cb(null, user);
            } else {
              //Did not pass password check
              return cb(null, false);
            }
          }
        });
      } else {
        return cb("User not found");
      }
    } catch (err) {
      console.log(err);
    }
  })
);*/
