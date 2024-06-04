import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";


function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [type, setType] = useState("");
  const navigate = useNavigate();
  const [showCreatePass, setShowCreatePass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const handleRegister = async () => {
    try {
      if (!validateForm()) return;

      const response = await axios.post("/api/auth/register", {
        name,
        email,
        password,
        type,
      });

      console.log("Registered user:", response.data);
      toast.success("Sign up successful!");
      toast.success("Redirecting to Verification Page")
      setTimeout(() => navigate("/verifyEmail"), 4000);
    } catch (error) {
      console.error("Error registering user:", error.response || error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Error registering user");
      } else {
        toast.error("Error registering user");
      }
    }
  };

  const validateForm = () => {
    if (!name.match(/^[a-zA-Z ]+$/)) {
      toast.error("Name must contain only alphabets");
      return false;
    }

    if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      toast.error("Invalid email address");
      return false;
    }

    if (password.length < 6 || !password.match(/[!@#$%^&*(),.?":{}|<>]/)) {
      toast.error("Password must be at least 6 characters long and contain a special symbol");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    if (!type) {
      toast.error("Please select whether you are a household or business");
      return false;
    }

    return true;
  };

  return (
    <div>
      <ToastContainer autoClose={4000} position="top-center" newestOnTop/>
      <div className="login m-4 flex justify-center items-center space-x-2 my-16">
        <div className="loginBox flex flex-col bg-gray-200 p-5 md:p-10 space-y-3 rounded-lg justify-center">
        <h1 className="text-center font-medium text-xl md:text-2xl py-4">Signup Form</h1>
          <div className="inputs flex flex-col space-y-2 ">
            <input
              type="text"
              className="username rounded-lg px-3 p-2 md:px-4 md:p-3"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

                      <input
                          type="email"
                          className="username rounded-lg px-3 p-2 md:px-4 md:p-3"
                          placeholder="Enter Your Email ID"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                      />
                      <label className=" relative">
                          <input
                              type={showCreatePass ? "text" : "password"}
                              className="w-full password rounded-lg px-3 p-2 md:px-4 md:p-3 "
                              placeholder="Create a Password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                          />
                          <span
                              onClick={() => setShowCreatePass(!showCreatePass)}
                              className="absolute right-3 top-3 cursor-pointer z-10">
                              {showCreatePass ? (
                                  <AiOutlineEyeInvisible
                                      fontSize={24}
                                      fill="#AFB2BF"
                                  />
                              ) : (
                                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                              )}
                          </span>
                      </label>

                      <label className="relative">
                          <input
                              type={showConfirmPass ? "text" : "password"}
                              className="w-full password rounded-lg px-3 p-2 md:px-4 md:p-3 "
                              placeholder="Confirm Password"
                              value={confirmPassword}
                              onChange={(e) =>
                                  setConfirmPassword(e.target.value)
                              }
                              required
                          />
                          <span
                              onClick={() =>
                                  setShowConfirmPass(!showConfirmPass)
                              }
                              className="absolute right-3 top-3 cursor-pointer z-10">
                              {showConfirmPass ? (
                                  <AiOutlineEyeInvisible
                                      fontSize={24}
                                      fill="#AFB2BF"
                                  />
                              ) : (
                                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                              )}
                          </span>
                      </label>
                      <div className="radioButtons  p-3">
                          I need to Calculate CF for : <br />
                          <input
                              type="radio"
                              name="option"
                              value="Household"
                              onChange={(e) => setType(e.target.value)}
                              required
                          />{" "}
                          Household
                          <br />
                          <input
                              type="radio"
                              name="option"
                              value="Business"
                              onChange={(e) => setType(e.target.value)}
                              required
                          />{" "}
                          Business
                      </div>
                  </div>
                  <button
                      onClick={handleRegister}
                      className="btn  p-2 rounded-full bg-green-500 hover:bg-green-600">
                      Sign Up
                  </button>
                  <div className="signUp">
                      Already have an account? Login by{" "}
                      <Link
                          to="/login"
                          className="text-blue-700  hover:underline">
                          Clicking here
                      </Link>
                  </div>
              </div>
          </div>
      </div>
  );
}

export default RegisterForm;


/*import React, { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import axios from "axios";

function RegisterForm() {
  const [name,setName]=useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");
  const navigate=useNavigate();

  
  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:3001/register", {
        name,
        email,
        password,
        type,
      });
      console.log(response);
      console.log("Registered user:", response.data);
      //alert("User has been Registered")
      
      navigate("/login");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };
  
  return (
    <div >
      <div className="login flex justify-center items-center space-x-2 my-16">
        <div className="loginBox flex flex-col bg-gray-400 p-10 space-y-3 rounded-lg justify-center">
          <div className="inputs flex flex-col space-y-2 ">
          <input
              type="text"
              className="username rounded-full px-4"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="email"
              className="username rounded-full px-4"
              placeholder="Enter Your Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              className="password rounded-full px-4"
              placeholder="Create a Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="radioButtons">
              I need to Calculate CF for : <br />
              <input
                type="radio"
                name="option"
                value="Household"
                onChange={(e) => setType(e.target.value)}
                required
              />{" "}
              Household
              <br />
              <input
                type="radio"
                name="option"
                value="Business"
                onChange={(e) => setType(e.target.value)}
                required
              />{" "}
              Business
            </div>
          </div>
          <button
            onClick={handleRegister}
            className="btn  p-2 rounded-full bg-green-300 hover:bg-green-400"
          >
            Sign Up
          </button>
          <div className="signUp">
            Already have an account? Login by{" "}
            <Link to="/login" className="text-blue-700 hover:underline">
              Clicking here
            </Link>
          </div>
        </div>
      </div>
      ;
    </div>
  );
}

export default RegisterForm;*/
