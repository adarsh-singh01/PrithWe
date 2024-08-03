import React from 'react';
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaGithub, FaInfoCircle, FaCalculator, FaInfo, FaEnvelope } from 'react-icons/fa';
import logo2 from '../assets/footerlogo.png';
import xFavicon from '../assets/x.png';
import Visit from './Visitor';

const Footer2 = () => {
  return (
    <footer className="bg-gray-900 shadow">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-start sm:justify-between">
          <a href="#" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <img src={logo2} className="h-16" alt="Logo" />
          </a>
          <div className="flex flex-col sm:flex-row sm:space-x-8">
            <ul className="text-sm font-medium text-gray-500 dark:text-gray-400">
              <Link to="/aboutUs">
                <li className="mb-4 flex items-center">
                  <FaInfoCircle className="mr-2" />
                  <a href="#" className="hover:underline">About</a>
                </li>
              </Link>
              <Link to="/calculator">
                <li className="mb-4 flex items-center">
                  <FaCalculator className="mr-2" />
                  <a href="#" className="hover:underline">Calculator</a>
                </li>
              </Link>
              <Link to="/information">
                <li className="mb-4 flex items-center">
                  <FaInfo className="mr-2" />
                  <a href="#" className="hover:underline">Information</a>
                </li>
              </Link>
              <Link to="/contactUs">
                <li className="flex items-center">
                  <FaEnvelope className="mr-2" />
                  <a href="#" className="hover:underline">Contact</a>
                </li>
              </Link>
            </ul>
            <div className="mt-4 sm:mt-0">
              <span className="text-gray-500 dark:text-gray-400 block mb-4">Follow Us</span>
              <div className="grid grid-cols-2 gap-4">
                <a href="https://www.facebook.com" className="text-gray-400 hover:text-blue-500">
                  <FaFacebookF className="w-6 h-6" />
                </a>
                <a href="https://www.instagram.com" className="text-gray-400 hover:text-pink-500">
                  <FaInstagram className="w-6 h-6" />
                </a>
                <a href="https://www.x.com" className="group">
                  <img src={xFavicon} className="w-5 h-5 group-hover:filter group-hover:invert" alt="X Favicon" />
                </a>
                <a href="https://github.com/adarsh-singh01/PrithWe" className="text-gray-400 hover:text-gray-500">
                  <FaGithub className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <Visit />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024 <a href="#" className="hover:underline">PrithWe™</a>. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer2;
