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
  
 

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL,
    pass: process.env.APP_PASSWORD,
  },
});

export function generateSixDigitOTP() {
  let otp = "";
  for (let i = 0; i < 6; i++) {
    otp += Math.floor(Math.random() * 10); // Generate a random digit between 0 and 9
  }
  return otp;
}

export const sendOTP = wrapAsync(async (email,otp) => {
  try { 
    const mailOptions = {
      from: "maileroereview@gmail.com",
      to: email,
      subject: "Email Verification OTP",
      text: `Your OTP for email verification is: ${otp}`
    };

    await transporter.sendMail(mailOptions);  
    return otp;
  } catch (error) {
    console.log(error);
  }
});