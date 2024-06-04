import React from "react";

function BelowHero() {
  return (
    <div>
      <div className="flex bg-gray-200 bg-opacity-50 flex-col justify-center items-center space-y-8 py-28 md:py-40">
        <h1 className="text-2xl md:text-4xl font-Rubik">What is Carbon Footprint?</h1>
        <p className={`text-slate-600 text-base m-2 md:text-xl text-center font-Rubik `} >
        Just like an actual footprint it is a mark you leave upon the environment <br />(not with your shoes 😅) but with every action that releases carbon.         
        </p>
      </div>
    </div>
  );
}

export default BelowHero;
