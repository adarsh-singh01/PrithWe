import React from 'react';
import { Link } from "react-router-dom";
import logo2 from '../assets/footerlogo.png'


const Footer2 = () =>{

  return (
    <footer className="bg-gray-900 shadow ">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a href="#" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
       
            <img src={logo2} className="h-16" alt="Logo" />
            
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
          <Link to="/aboutUs">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">About</a>
            </li>
            </Link>
            <Link to="/calculator">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">Calculator</a>
            </li>
            </Link>
            <Link to="/information">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">Information</a>
            </li>
            </Link>
            <Link to="/contactUs">
            <li>
              <a href="#" className="hover:underline">Contact</a>
            </li>
            </Link>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="#" className="hover:underline">PrithWe™</a>. All Rights Reserved.</span>
      </div>
    </footer>
  );
};

export default Footer2;
