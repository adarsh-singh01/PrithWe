import React from "react";
import logo2 from "../assets/footerlogo.png";
import { Link } from "react-router-dom";

function NewFooter() {
  return (
    <footer className="bg-[#0a160d] mt-5  dark:bg-gray-900">
      <div className="container px-6 py-3 mx-auto">
        <div className="flex md:mt-4  flex-col md:flex-row md:justify-between items-center text-center">
          <Link href="#">
            <img alt="" className="w-auto h-14" src={logo2} />
          </Link>

          <div className="flex flex-wrap justify-center mt-6 mx-4">
            <Link
              href="#"
              className="mx-4 text-sm text-gray-300 transition-colors duration-300 hover:text-[#16A349] dark:text-gray-300 dark:hover:text-blue-400"
              aria-label="Reddit"
            >
              Home
            </Link>

            <Link
              href="#"
              className="mx-4 text-sm text-gray-300 transition-colors duration-300 hover:text-[#16A349] dark:text-gray-300 dark:hover:text-blue-400"
              aria-label="Reddit"
            >
              About
            </Link>

            <Link
              href="#"
              className="mx-4 text-sm text-gray-300 transition-colors duration-300 hover:text-[#16A349] dark:text-gray-300 dark:hover:text-blue-400"
              aria-label="Reddit"
            >
              Teams
            </Link>

            <Link
              href="#"
              className="mx-4 text-sm text-gray-300 transition-colors duration-300 hover:text-[#16A349] dark:text-gray-300 dark:hover:text-blue-400"
              aria-label="Reddit"
            >
              Privacy
            </Link>

            <Link
              href="#"
              className="mx-4 text-sm text-gray-300 transition-colors duration-300 hover:text-[#16A349] dark:text-gray-300 dark:hover:text-blue-400"
              aria-label="Reddit"
            >
              Cookies
            </Link>
          </div>
        </div>

        <hr className="my-6 border-gray-200 md:my-10 dark:border-gray-700" />

        <div className="flex flex-col items-center md:pb-5 pb-2  sm:flex-row sm:justify-between">
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            ©2024{" "}
            <Link href="#" className="hover:underline">
              PrithWe™
            </Link>
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}

export default NewFooter;
