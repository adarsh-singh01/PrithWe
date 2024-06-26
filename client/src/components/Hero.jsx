import React from "react";
import giffy from "../assets/Hero.gif";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
function Hero() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  })
  return (
    <div>
      <div className="hero m-3 flex justify-center items-center space-x-2 my-12 md:my-16">

        <div className="card bg-gray-200 max-w-sm rounded-lg p-6 space-y-4 md:space-y-8" data-aos="fade-right">
          <div className="heading  font-medium font-Rubik text-2xl md:text-4xl">
            Wanna reduce your <span className="text-green-500">carbon footprints</span>? <span className="">Calculate</span> it first 
          </div>
          <div className="para font-Rubik text-sm md:text-base text-slate-600">
            Our platform, PrithWe, empowers households and businesses to
            calculate their environmental impact accurately with easy-to-use
            tools and insightful data. 
          </div>
          <div className="btn w-fit bg-green-500 font-Rubik p-2 md:py-3 px-3 rounded-2xl  hover:bg-green-600">
            <Link to="/calculator">Track Your Carbon Footprint</Link>
          </div>
        </div>
        <div className="gif">
          <img className="rounded-lg hidden sm:block md:max-w-sm" src={giffy} data-aos="fade-left"/>
        </div>
      </div>
      
    </div>
  );
}

export default Hero;
