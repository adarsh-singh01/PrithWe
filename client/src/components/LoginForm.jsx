import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      }, { withCredentials: true });

      console.log("Logged in user:", response.data);
      toast.success("Login successful!");
      
      setTimeout(() => {
        //navigate("/calculator");
        window.location.reload();
      }, 2000); // Redirect after 4 seconds

    } catch (error) {
      console.error("Error logging in user:", error);
      toast.error("Error logging in. Please check your credentials.");
    }
  };

  return (
    <div>
      <ToastContainer autoClose={4000} position="top-center" newestOnTop/>
      <div className="login flex-grow flex justify-center items-center space-x-2 my-16 ">
        <div className="loginBox flex flex-col bg-gray-200 p-10 space-y-3 rounded-lg justify-center">
        <p className="text-center font-medium text-2xl py-4">Login Form</p>
          <div className="inputs flex flex-col space-y-2 ">
            <input
              type="email"
              className="username rounded-lg px-4 p-3 "
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              className="password rounded-lg px-4 p-3 "
              placeholder="Enter Password"
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="btn  p-2 rounded-full bg-green-500  hover:bg-green-600"
            onClick={handleLogin}
          >
            Login
          </button>

          <div className="signUp ">
            Don't have an account? Create one by{" "}
            <Link to="/register" className="text-blue-700 hover:underline">
              Clicking here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;



/*const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3001/login", {
        email,
        password,
      }, { withCredentials: true }); // Ensure cookies are included
      console.log("Logged in user:", response.data);
      navigate("/calculator");
    } catch (error) {
      console.error("Error logging in user:", error);
    }
  };*/

/*const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });
      console.log("Logged in user:", response.data); //this thing is giving an mumbo jumbo...it is giving code of my index.html
      navigate("/calculator"); // Navigate to secrets page upon successful login
    } catch (error) {
      console.error("Error logging in user:", error);
    }
  };*/

  /*const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });
      console.log("Logged in user:", response.data);

      // Fetch user authentication status after successful login
      const authResponse = await axios.get("http://localhost:3001/login/status");
      setIsLoggedIn(!!authResponse.data); // Update login status based on response

      // Redirect to calculator page upon successful login
      navigate("/calculator");
    } catch (error) {
      console.error("Error logging in user:", error);
    }
  };*/
/*import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/login', {
        email,
        password,
      });
      console.log(response);
      console.log('Logged in user:', response.data);
    } catch (error) {
      console.error('Error logging in user:', error);
    }
  };
  
  
  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        name='password'
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      
    </div>
  );
}

export default Login;

/*const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/login', {
        email,
        password,
      });
      console.log(response)
      console.log('Logged in user:', response.data);
    } catch (error) {
      console.error('Error logging in user:', error.message);
      setError('Failed to login. Please check your credentials.');
    }
  };*/
