import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ContactUsForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    const subject1="New Contact Data Form"
    const subject2="Thank You For Reaching Out"
    e.preventDefault();

    // Validation
    if (!name.match(/^[a-zA-Z ]+$/)) {
      toast.error("Name must contain only alphabets");
      return;
    }

    if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      toast.error("Invalid email address");
      return;
    }

    if (!message.trim()) {
      toast.error("Message cannot be empty");
      return;
    }

    try {
      await axios.post("/api/contact/contact", {
        name,
        email,
        message,
        subject1,
        subject2
      });
      toast.success("Message sent successfully");
      setName("");
      setEmail("");
      setMessage("");
      setSubmitted(true);
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    }
  };

  return (
    <div>
      {submitted ? (
        <div className="contact  flex justify-center items-center space-x-2 my-16">
          <div className="contactBox flex flex-col bg-gray-200 p-10 space-y-3 rounded-lg justify-center items-center">
            <div className="inputs flex flex-col space-y-4 ">
            <p className="text-xl text-slate-600">Your message has been sent !!</p>
              <h1 className="text-3xl text-center">
                Thank you <br /> for your <br /> message!
              </h1>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="contact mx-3 flex justify-center items-center space-x-2 my-16">
            <div className="contactBox flex flex-col  bg-gray-200 p-7 md:p-10 space-y-3 rounded-lg justify-center items-center">
              <h1 className="text-lg md:text-xl">Send us a message</h1>
              <div className="inputs flex flex-col space-y-2 ">
                <input
                  className="name rounded-lg px-2 md:px-4 p-2 md:p-3 "
                  placeholder="Enter Your Name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  className="email rounded-lg px-2 md:px-4 p-2 md:p-3 "
                  placeholder="Enter Your Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <textarea
                  className="message rounded-lg p-2 md:p-4"
                  placeholder="Enter Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>
              <button
                className="btn w-full p-2 md:py-3 px-3 rounded-full bg-green-500  hover:bg-green-600"
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default ContactUsForm;



{
  /*<form onSubmit={handleSubmit}>
                    <div>
                        <label>Name:</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div>
                        <label>Message:</label>
                        <textarea value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
                    </div>
                    <button type="submit">Submit</button>
</form>*/
}
