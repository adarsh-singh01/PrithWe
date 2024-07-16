/*import React from "react";

function InfoCard() {
  return (
    <div>
      <div className="card1">
        <h1>Easy to use</h1>
        <p>Our platform offers a user-friendly interface, making it simple for anyone to calculate their carbon footprint effortlessly.</p>
      </div>
    </div>
  );
}

export default InfoCard;*/

import React,{useEffect} from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
function FeatureCard({ heading, description }) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  return (
    <div className=" bg-opacity- bg-gray-200 text-center rounded-md px-4 py-6 md:py-12 max-w-sm shadow-md" data-aos={"fade-up"} data-aos-duration="1100">
      <h1 className="text-lg md:text-xl text-green-600 font-semibold mb-2 font-Rubik">{heading}</h1>
      <h1 className="text-slate-600 text-sm md:text-base font-Rubik">{description}</h1>
    </div>
  );
}

function InfoCard() {
  return (
    <div>
    <p className='text-center font-Rubik pt-12 md:pt-16 text-2xl md:text-4xl' data-aos={"fade-up"}>Why Choose Us?</p>
    <div className="flex flex-col items-center sm:items-stretch space-y-4 sm:space-y-0 sm:flex-row  sm:justify-around p-4 md:p-8 ">
    
      <FeatureCard 
        heading="Easy to use"
        description="Our platform offers a user-friendly interface, making it simple for anyone to calculate their carbon footprint effortlessly."
      />
      <FeatureCard
        heading="Accurate Results"
        description="We provide precise calculations, ensuring that you receive accurate insights into your environmental impact."
      />
      <FeatureCard
        heading="Chart representation"
        description="Visualize your carbon footprint breakdown through interactive pie charts, allowing for easy interpretation of data."
      />
    </div>
    </div>
  );
}

export default InfoCard;

/*import React from 'react';
import {logo3} from '../assets/footerlogo.png'

function InfoCard() {
  return (
    <div>
        <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img class="rounded-t-lg" src={logo3} alt="" />
    </a>
    <div class="p-5">
        <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
        <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Read more
             <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </a>
    </div>
</div>
    </div>
  )
}

export default InfoCard*/
