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
import memorystore from 'memorystore';
const MemoryStore = memorystore(session);



const router = express.Router();


const app = express();

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


// Register endpoint
router.post('/register', async (req, res) => {
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

/*app.get('/user-type', (req, res) => {
  console.log("inside finding user type")
  req.session.userType=req.user.type
  // Retrieve user type from the session or database
  const userType = req.session.userType; // Assuming userType is stored in the session upon login
  //const userType = req.user.type
  console.log(userType)
  
  //res.json({ userType });
  return req.user ? res.send(req.user) : res.sendStatus(401);
  
});
*/


router.post('/login', (req, res, next) => {
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

router.get('/login/status',
(request,response)=>{
  console.log("inside /login/status")
  console.log(request.user);
  console.log(request.user.id)//it sends the unique id i.e. UUID of the logged in user ...if not working ...restart client server
  console.log(request.user.type)//it outputs the type of user
  console.log(request.session);
  request.session.userId = request.user.id; // Store the user ID in the session
  //console.log(request.session.id)
  return request.user ? response.send(request.user) : response.sendStatus(401);
  
})

router.get('/user-type', (req, res) => {
  console.log("inside finding user type")
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

router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Error logging out:', err);
      return res.sendStatus(500); // Internal server error
    }
    return res.sendStatus(200); // Success
  });
});

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



export default router