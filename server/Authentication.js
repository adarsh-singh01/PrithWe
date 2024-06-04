import express, { request, response } from 'express';
import bodyParser from 'body-parser';
//import pg from 'pg';
import bcrypt from 'bcrypt';
import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import cors from 'cors'; // Import cors module
import env from "dotenv";
import cookieParser from 'cookie-parser'; // Import cookie-parser module
import { query } from './db.js';
import memorystore from 'memorystore';
const MemoryStore = memorystore(session);
import { generateSixDigitOTP, sendOTP } from './SendOTP.js';



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
/*const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
db.connect();*/


// Register endpoint
router.post('/register', async (req, res) => {
  const { name,email, password,type } = req.body;

  try {
    const checkResult = await query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);//db.query

    if (checkResult.rows.length > 0) {
      res.status(400).send('User already exists');
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error('Error hashing password:', err);
          res.status(500).send('Error registering user');
        } else {
          const result = await query(
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
  if(req.body.email==process.env.ADMIN_MAIL && req.body.password==process.env.ADMIN_PASS){
    return res.status(200).json({type:"admin"})
  }
  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) { return res.status(401).send('Invalid credentials'); }
    if(!user.isverified){return res.status(402).send("Not Verified");}
    req.logIn(user, (err) => {
      if (err) { return next(err); }
      req.session.userId = user.id; // Store the user's ID in the session
      return res.status(200).json({type:"user"})
    });
  })(req, res, next);
});


router.post('/sendOTP', async (req, res) => {
  try {
    const email = req.body.email;
    const subject=req.body.subject; 
    const otp = generateSixDigitOTP();
    await sendOTP(email, otp, subject);

    // Update OTP in the database for the user with the specified email
    const result = await query(
      'UPDATE users SET otp = $1 WHERE email = $2 RETURNING *',
      [otp, email]
    );

    if (result.rowCount === 0) {
      res.status(404).json({ success: false, message: "Email not found" });
    } else {
      res.status(200).json({ success: true, message: "OTP Sent" });
    }
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
});

router.post('/verifyOTP', async (req, res) => {
  try {
    const { email, otp } = req.body;


    // Fetch the stored OTP for the given email from the database
    const result = await query(
      'SELECT otp FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      // If no user is found with the given email
      res.status(404).json({ success: false, message: "Email not found" });
      return;
    }

    const storedOtp = result.rows[0].otp;

    if (storedOtp === otp) {
      // If the provided OTP matches the stored OTP
      await query(
        'UPDATE users SET isVerified = true WHERE email = $1',
        [email]
      );
      res.status(200).json({ success: true, message: "OTP Verified" });
    } else {
      // If the provided OTP does not match the stored OTP
      res.status(400).json({ success: false, message: "Invalid OTP" });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ success: false, message: "Failed to verify OTP" });
  }
});


router.post('/resetPassword', async (req, res) => {
  const { email,newPassword } = req.body; 
  try {
      bcrypt.hash(newPassword, saltRounds, async (err, hash) => {
        if (err) {
          console.error('Error hashing password:', err);
          res.status(500).send('Error Reseting Password');
        } else { 
          const result = await query(
            'UPDATE users SET password = $1 WHERE email = $2 RETURNING *',
            [hash, email]
          );
          const user = result.rows[0]; 
          res.status(201).send(user);
        }
      });
  } catch (err) {
    console.log(err);
    res.status(500).send('Error Reseting Password');
  }
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

        const result = await query('SELECT * FROM users WHERE email = $1', [email]);

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
    const result = await query('SELECT * FROM users WHERE id = $1', [id]);
    const user = result.rows[0];
    done(null, user);
  } catch (err) {
    console.log(err);
    done(err,null);
  }
});



export default router
