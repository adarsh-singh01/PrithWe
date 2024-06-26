/*import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../assets/headerlogo.png';
import leaf from '../assets/leaf.png';

function Header() {
  const [logIn, setLogIn] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/auth/login/status', { withCredentials: true });
        if (response.status === 200) {
          setLogIn(true);
        }
      } catch (error) {
        setLogIn(false);
        console.error('Error checking login status:', error);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/auth/logout', {}, { withCredentials: true });
      if (response.status === 200) {
        setLogIn(false);
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
          {logIn && <Link to="/calculator"><li className="navItem hover:text-black text-white font-Rubik cursor-pointer">Calculator</li></Link>}
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
          {logIn && <Link to="/calculator"><li className="block px-4 py-2 text-white font-Rubik cursor-pointer">Calculator</li></Link>}
          <Link to="/information"><li className="block px-4 py-2 text-white font-Rubik cursor-pointer">Information</li></Link>
          <Link to="/aboutUs"><li className="block px-4 py-2 text-white font-Rubik cursor-pointer">About Us</li></Link>
        </div>
        <div className="hidden md:flex space-x-2">
          {logIn ? (
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
import sun from "../assets/sun.png";
import moon from "../assets/moon.png"
//aos animation
import AOS from "aos";
import "aos/dist/aos.css";

function Header({ setLoggedIn }) {
  const [logIn, setLogIn] = useState(false);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [theme, setTheme] = useState("light");
  
  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  
  };

const handleMenuClick = () => {
    setShowMenu(false);
};

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get(
          "/api/auth/login/status", //http://localhost:3001/api/auth/login/status
          { withCredentials: true }
        );
        if (response.status === 200) {
          setLogIn(true);
        }
      } catch (error) {
        setLogIn(false);
        console.error("Error checking login status:", error);
      }
    };

    checkLoginStatus();
});


  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "/api/auth/logout",
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        console.log("HERE")
        setLogIn(false);
        setLoggedIn(false);
        //checkLoginStatus();
        toast.success("Logout successful!");
        navigate("/logout");
      }
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Error logging out");
    }
  };
  
    useEffect(() => {
      const savedTheme = localStorage.getItem('theme') || 'light';
      setTheme(savedTheme);
      document.body.classList.toggle('dark-mode', savedTheme === 'dark');
    }, []);
  
    const toggleTheme = () => {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
      document.body.classList.toggle('dark-mode', newTheme === 'dark');
    };
    useEffect(()=>{
      AOS.init({
        duration: 1000,
      })
    })
  return (
    <div>
      <div>
        <ToastContainer autoClose={2000} position="top-center" newestOnTop />
        {/*<div className="navbar  list-none  flex justify-between items-center p-2 bg-blue-500 font-medium">
        <div className="logo flex space-x-2 items-center ">
          <a href="#"><img className="h-12" src={leaf} /></a>
          <a href="#"><img className="h-7" src={logo} /></a>
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
          {logIn && (
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
          {logIn ? (
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
    <div>*/}
        <nav
          className={`border-gray-200 ${
            theme === "dark" ? "bg-black " : "bg-blue-500 "
          } `}
          data-aos="fade-down"
        >
          <div
            className={` flex flex-wrap items-center justify-between  p-2 `}
          >
            <div className="logo flex space-x-2 items-center ">
              <a href="#">
                <img className="h-12" src={leaf} />
              </a>
              <a href="#">
                <img className="h-7" src={logo} />
              </a>
            </div>

            <div className=" md:hidden flex items-center justify-center">
            <button onClick={toggleTheme}  className="  theme-toggle-btn p-2 rounded-full">
            <img src={theme === "light" ? moon : sun} alt="Toggle Theme" className="w-10 h-10" />
          </button>
            
            <button

              onClick={() => { handleToggleMenu();}}
              style={{fontSize:'30px'}}
              className={`inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden  focus:outline-none focus:ring-2 focus:ring-white dark:text-gray-400 hover:bg-blue-600 fa ${showMenu ? 'fa-times' : 'fa-bars'} ${

                theme === "dark" ? "bg-black " : "bg-blue-500 "
              }`}
              aria-expanded={showMenu}
            >
              {/* <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg> */}
            </button>
            </div>

            <div
              className={`w-full md:flex md:w-auto  ${
                showMenu ? "block" : "hidden"
              }`}
              id="navbar-default  "
            >
            <ul onClick={handleMenuClick}
            className={`font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-4 rtl:space-x-reverse md:mt-0 md:border-0 ${
              theme === "dark" ? "bg-black" : "bg-blue-500"
            }`}
            
          >
            <li>
              <Link
                to="/"
                className={`block py-2 px-3 rounded md:hover:bg-transparent md:p-0 ${
                  theme === "dark" ? "text-white hover:text-white" : "text-white md:hover:text-black hover:bg-gray-700"
                }`}
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/contactUs"
                className={`block py-2 px-3 rounded md:hover:bg-transparent md:p-0 ${
                  theme === "dark" ? "text-white hover:text-white" : "text-white md:hover:text-black hover:bg-gray-700"
                }`}
              >
                Contact Us
              </Link>
            </li>
            {logIn && (
              <>   
              <li>
                <Link
                  to="/calculator"
                  className={`block py-2 px-3 rounded md:hover:bg-transparent md:p-0 ${
                    theme === "dark" ? "text-white hover:text-white" : "text-white md:hover:text-black hover:bg-gray-700"
                  }`}
                >
                  Calculator
                </Link>
              </li>
              <li>
                <Link
                  to="/history"
                  className={`block py-2 px-3 rounded md:hover:bg-transparent md:p-0 ${
                    theme === "dark" ? "text-white hover:text-white" : "text-white md:hover:text-black hover:bg-gray-700"
                  }`}
                >
                  History
                </Link>
              </li>
              </>
            )}
            <li>
              <Link
                to="/information"
                className={`block py-2 px-3 rounded md:hover:bg-transparent md:p-0 ${
                  theme === "dark" ? "text-white hover:text-white" : "text-white md:hover:text-black hover:bg-gray-700"
                }`}
              >
                Information
              </Link>
            </li>
            <li>
              <Link
                to="/tips"
                className={`block py-2 px-3 rounded md:hover:bg-transparent md:p-0 ${
                  theme === "dark" ? "text-white hover:text-white" : "text-white md:hover:text-black hover:bg-gray-700"
                }`}
              >
                Tips
              </Link>
            </li>
            <li>
              <Link
                to="/aboutUs"
                className={`block py-2 px-3 rounded md:hover:bg-transparent md:p-0 ${
                  theme === "dark" ? "text-white hover:text-white" : "text-white md:hover:text-black hover:bg-gray-700"
                }`}
              >
                About Us
              </Link>
            </li>

            <div className="btns md:hidden">
              {logIn ? (
                <button
                  onClick={handleLogout}
                  className="btn w-full text-start bg-white mt-3 px-3 py-2 font-Rubik rounded-full hover:bg-black hover:text-white"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/login">
                    <li className="btn bg-white px-3 py-1 mb-2 mt-3 font-Rubik rounded-full hover:bg-black hover:text-white">
                      Login
                    </li>
                  </Link>
                  <Link to="/register">
                    <li className="btn bg-white flex px-3 py-1 font-Rubik rounded-full hover:bg-black hover:text-white">
                      Sign Up
                    </li>
                  </Link>
                </>
              )}
            </div>
          </ul>
            </div>
            
            <div className="btns hidden justify-center items-center font-medium md:flex space-x-2">
            <button onClick={toggleTheme} className="theme-toggle-btn p-2 rounded-full">
            <img src={theme === "light" ? moon : sun} alt="Toggle Theme" className="w-10 h-10" />
          </button>
              {logIn ? (
                <button
                  onClick={handleLogout}
                  className="btn bg-white px-3 py-2 font-Rubik rounded-full hover:bg-black hover:text-white"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/login">
                    <li className="btn list-none bg-white px-3 py-2 font-Rubik rounded-full hover:bg-black hover:text-white">
                      Login
                    </li>
                  </Link>
                  <Link to="/register">
                    <li className="btn bg-white flex px-3 py-2 font-Rubik rounded-full hover:bg-black hover:text-white">
                      Sign Up
                    </li>
                  </Link>
                </>
              )}
            </div>

            
          </div>
        </nav>
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
