import nodemailer from "nodemailer"
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { query } from './db.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config();

const wrapAsync = (fn) => {
    return (req, res, next) => {
      Promise.resolve(fn(req, res, next)).catch((err) => {
        next(err);
      });
    };
  };
  
 

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 587, false for other ports
    requireTLS: true,
    auth: {
      user: process.env.MAIL,
      pass: process.env.APP_PASSWORD 
    },
});

export function generateSixDigitOTP() {
  let otp = "";
  for (let i = 0; i < 6; i++) {
    otp += Math.floor(Math.random() * 10); // Generate a random digit between 0 and 9
  }
  return otp;
}

const getHtmlTemplate = (otp) => {

  const templatePath = path.resolve(__dirname, "EmailTemplates", "SendOtp.html");

  //const templatePath = path.resolve(__dirname, "EmailTemplate", "emailTemplate.html");

  let template = fs.readFileSync(templatePath, "utf8");
  return template.replace("{{otp}}", otp);
};


export const sendOTP = wrapAsync(async (email, otp, subject) => {
  try { 
    const htmlContent = getHtmlTemplate(otp);

    const mailOptions = {
      from: process.env.MAIL,
      to: email,
      subject: subject,
      text: `Your OTP for pritwe is: ${otp}`,
      html: htmlContent
    };
    await transporter.sendMail(mailOptions);
    const timestamp = Date.now(); // Getting current timestamp

    // Storing OTP and timestamp in the database
   return await query('UPDATE users SET otp = $1, otp_timestamp = $2 WHERE email = $3', [otp, timestamp, email]); 

  } catch (error) {
    console.log(error);
  }
});
