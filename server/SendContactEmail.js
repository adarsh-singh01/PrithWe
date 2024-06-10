import nodemailer from "nodemailer";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config();

// Error handling wrapper
const wrapAsync = (fn) => {
  return (...args) => {
    fn(...args).catch((err) => {
      console.error(err); // Log the error
    });
  };
};

// Nodemailer transporter configuration
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  requireTLS: true,
  auth: {
    user: process.env.MAIL,
    pass: process.env.APP_PASSWORD 
  },
});

const getFormDataHtmlTemplate = (name,email,message) => {
  const templatePath = path.resolve(__dirname, "EmailTemplates", "FormData.html");
  let template = fs.readFileSync(templatePath, "utf8");
  template=template.replace("{{name}}", name);
  template=template.replace("{{email}}", email);
  template=template.replace("{{message}}", message);
  return template;
};

// Function to receive contact data and send an email
export const ReceviceContactData = (async (name, email, message, subject) => {
  const htmlContent=getFormDataHtmlTemplate(name,email,message);
  try { 
    const mailOptions = {  
      from:email,
      to: process.env.MAIL,
      subject: subject,
      html:htmlContent
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
});

// Function to get HTML template and replace name placeholder
const getThankYouHtmlTemplate = (name) => {
  const templatePath = path.resolve(__dirname, "EmailTemplates", "ThankYou.html");
  let template = fs.readFileSync(templatePath, "utf8");
  return template.replace("{{name}}", name);
};

// Function to send an email with an HTML template
export const sendContactEmail = (async (name, email,  subject) => {
  const htmlContent = getThankYouHtmlTemplate(name);
  try { 
    const mailOptions = {  
      from: process.env.MAIL,
      to: email,
      subject: subject,
      html: htmlContent 
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending  email:", error);
  }
});
