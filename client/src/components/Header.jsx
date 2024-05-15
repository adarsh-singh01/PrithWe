/*import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../assets/headerlogo.png';
import leaf from '../assets/leaf.png';

function Header() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/auth/login/status', { withCredentials: true });
        if (response.status === 200) {
          setLoggedIn(true);
        }
      } catch (error) {
        setLoggedIn(false);
        console.error('Error checking login status:', error);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/auth/logout', {}, { withCredentials: true });
      if (response.status === 200) {
        setLoggedIn(false);
        toast.success('Logout successful!');
        setTimeout(() => {
          navigate('/logout');
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Error logging out');
    }
  };

  return (
    <div>
      <ToastContainer autoClose={2000} position="top-center" newestOnTop />
      <div className="navbar list-none flex justify-between items-center p-2 bg-blue-500 font-medium">
        <div className="logo flex space-x-2 items-center">
          <img className="h-12" src={leaf} alt="Leaf Logo" />
          <img className="h-7" src={logo} alt="Header Logo" />
        </div>
        <div className="hidden md:flex space-x-4">
          <Link to="/"><li className="navItem hover:text-black text-white font-Rubik cursor-pointer">Home</li></Link>
          <Link to="/contactUs"><li className="navItem hover:text-black text-white font-Rubik cursor-pointer">Contact Us</li></Link>
          {loggedIn && <Link to="/calculator"><li className="navItem hover:text-black text-white font-Rubik cursor-pointer">Calculator</li></Link>}
          <Link to="/information"><li className="navItem hover:text-black text-white font-Rubik cursor-pointer">Information</li></Link>
          <Link to="/aboutUs"><li className="navItem hover:text-black text-white font-Rubik cursor-pointer">About Us</li></Link>
        </div>
        <div className="md:hidden">
          <button onClick={() => setShowMenu(!showMenu)} className="focus:outline-none">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {showMenu ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
        <div className={`${showMenu ? 'flex flex-col' : 'hidden'} md:hidden space-y-2`}>
          <Link to="/"><li className="block px-4 py-2 text-white font-Rubik cursor-pointer">Home</li></Link>
          <Link to="/contactUs"><li className="block px-4 py-2 text-white font-Rubik cursor-pointer">Contact Us</li></Link>
          {loggedIn && <Link to="/calculator"><li className="block px-4 py-2 text-white font-Rubik cursor-pointer">Calculator</li></Link>}
          <Link to="/information"><li className="block px-4 py-2 text-white font-Rubik cursor-pointer">Information</li></Link>
          <Link to="/aboutUs"><li className="block px-4 py-2 text-white font-Rubik cursor-pointer">About Us</li></Link>
        </div>
        <div className="hidden md:flex space-x-2">
          {loggedIn ? (
            <button onClick={handleLogout} className="btn bg-white px-3 py-2 font-Rubik rounded-full hover:bg-black hover:text-white">Logout</button>
          ) : (
            <>
              <Link to="/login"><li className="btn bg-white px-3 py-2 font-Rubik rounded-full hover:bg-black hover:text-white">Login</li></Link>
              <Link to="/register"><li className="btn bg-white px-3 py-2 font-Rubik rounded-full hover:bg-black hover:text-white">Sign Up</li></Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;*/

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/headerlogo.png";
import leaf from "../assets/leaf.png";

function Header() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get(
          "/api/auth/login/status",//http://localhost:3001/api/auth/login/status
          { withCredentials: true }
        );
        if (response.status === 200) {
          setLoggedIn(true);
        }
      } catch (error) {
        setLoggedIn(false);
        console.error("Error checking login status:", error);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "/api/auth/logout",
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        setLoggedIn(false);
        //checkLoginStatus();
        toast.success("Logout successful!");
        setTimeout(() => {
          navigate("/logout");
          window.location.reload(); // here i am reloading the page bcoz its not showing the calculator and logout buttons instantly.
        }, 1000); // redirecting to home page after 2 seconds
      }
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Error logging out");
    }
  };

  return (
    <div>
      <ToastContainer autoClose={2000} position="top-center" newestOnTop />
      <div className="navbar  list-none  flex justify-between items-center p-2 bg-blue-500 font-medium">
        <div className="logo flex space-x-2 items-center ">
          <img className="h-12" src={leaf} />
          <img className="h-7" src={logo} />
        </div>
        <div className="options hidden md:flex md:space-x-4">
          <Link to="/">
            <li className="navItem hover:text-black text-white font-Rubik hover:cursor-pointer">
              Home
            </li>
          </Link>
          <Link to="/contactUs">
            <li className="navItem hover:text-black text-white font-Rubik hover:cursor-pointer">
              Contact Us
            </li>
          </Link>
          {loggedIn && (
            <Link to="/calculator">
              <li className="navItem hover:text-black text-white font-Rubik hover:cursor-pointer">
                Calculator
              </li>
            </Link>
          )}
          <Link to="/information">
            <li className="navItem hover:text-black text-white font-Rubik hover:cursor-pointer">
              Information
            </li>
          </Link>
          <Link to="/aboutUs">
            <li className="navItem hover:text-black text-white font-Rubik hover:cursor-pointer">
              About Us
            </li>
          </Link>
        </div>
        <div className="btns flex space-x-2">
          {loggedIn ? (
            <button
              onClick={handleLogout}
              className="btn bg-white px-3 py-2 font-Rubik rounded-full hover:bg-black hover:text-white"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login">
                <li className="btn bg-white px-3 py-2 font-Rubik rounded-full hover:bg-black hover:text-white">
                  Login
                </li>
              </Link>
              <Link to="/register">
                <li className="btn bg-white hidden md:flex px-3 py-2 font-Rubik rounded-full hover:bg-black hover:text-white">
                  Sign Up
                </li>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;

/*import React from 'react';
import { Link } from 'react-router-dom';

function Header({ isAuthenticated }) {
  return (
    <div>
      <div className="navbar  list-none flex justify-between items-center p-2 bg-green-400 font-medium">
        <div className="logo">Carbon Zero</div>
        <div className="options flex space-x-4">
          <Link to="/"><li className="navItem hover:text-red-600 hover:cursor-pointer">Home</li></Link>
          <Link to="/contactUs"><li className="navItem hover:text-red-600 hover:cursor-pointer">Contact Us</li></Link>
          {isAuthenticated && <Link to="/calculator"><li className="navItem hover:text-red-600 hover:cursor-pointer">Calculator</li></Link>}
          <Link to="/information"><li className="navItem hover:text-red-600 hover:cursor-pointer">Information</li></Link>
          <Link to="/aboutUs"><li className="navItem hover:text-red-600 hover:cursor-pointer">About Us</li></Link>
        </div>
        <div className="btns flex space-x-2">
          {isAuthenticated ? (
            <>
              <button onClick={logout} className="btn bg-white p-2 rounded-lg hover:bg-slate-200">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login"><li className="btn bg-white p-2 rounded-lg hover:bg-slate-200">Login</li></Link>
              <Link to="/register"><li className="btn bg-white p-2 rounded-lg hover:bg-slate-200">Sign Up</li></Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;*/

/*import React from 'react'
import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
        <div className="navbar  list-none flex justify-between items-center p-2 bg-green-400 font-medium">
        <div className="logo">Carbon Zero</div>
        <div className="options flex space-x-4">
        <Link to="/"><li className="navItem hover:text-red-600 hover:cursor-pointer">Home</li></Link>
        <Link to="/contactUs"><li className="navItem hover:text-red-600 hover:cursor-pointer">Contact Us</li></Link>
        <Link to="/calculator"><li className="navItem hover:text-red-600 hover:cursor-pointer">Calculator</li></Link>
        <Link to="/information"><li className="navItem hover:text-red-600 hover:cursor-pointer">Information</li></Link>
        <Link to="/aboutUs"><li className="navItem hover:text-red-600 hover:cursor-pointer">About Us</li></Link>  
          
          
        </div>
        <div className="btns flex space-x-2">
        <Link to="/login"><li className="btn bg-white p-2 rounded-lg hover:bg-slate-200">Login</li></Link> 
        <Link to="/register"><li className="btn bg-white p-2 rounded-lg hover:bg-slate-200">Sign Up</li></Link>  
          
        </div>
      </div>
    </div>
  )
}

export default Header;*/
