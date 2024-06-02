import nodemailer from "nodemailer"
import dotenv from "dotenv";

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

export const sendOTP = wrapAsync(async (email, otp, subject) => {
  try { 
    const mailOptions = {
      from: process.env.MAIL,
      to: email,
      subject: subject,
      text: `Your OTP for pritwe is: ${otp}`
    };

    await transporter.sendMail(mailOptions);  
    return otp;
  } catch (error) {
    console.log(error);
  }
});
