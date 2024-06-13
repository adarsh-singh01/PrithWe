import React from "react";

function BelowHero() {
  return (
    <div class="flex bg-gray-200 bg-opacity-50 py-28 md:py-40 container">
      <div class="flex-none">
        <img src="src/assets/homeimg.jpeg" alt="" class="img-fluid custom-rounded  ml-20" width="400" height="400"  />
      </div>
      <div class="flex flex-col justify-center items-center flex-grow px-8 md:px-16">
        <h1 class="text-2xl md:text-4xl font-Rubik">What is Carbon Footprint?</h1>
        <p class="text-slate-600 text-base md:text-xl text-center font-Rubik mt-8">
            Just like an actual footprint it is a mark you leave upon the environment <br />(not with your shoes 😅) but with every action that releases carbon.         
        </p>
    </div>
    </div>
  );
}

export default BelowHero;
