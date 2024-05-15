import React from 'react';
import DoughnutChart from './DoughnutChart';


const HouseholdResult = ({ totalCarbonFootprint, contributions }) => {
  return (
    <div className="mt-4 mb-16 space-y-16">
      {totalCarbonFootprint !== null && (
        <div className="mt-4 flex flex-col justify-center items-center ">
          <h3 className="text-lg md:text-xl  font-medium mb-2 mx-4">Total Carbon Footprint</h3>
          <p className='mx-4 text-3xl md:text-6xl font-medium '>{Math.round(totalCarbonFootprint*100)/100} 
          <span className='font-thin'>KgCO<sub>2</sub></span></p>
        </div>
      )}
      {/* Render Doughnut Chart */}
      <DoughnutChart contributions={contributions} />
    </div>
  );
}

export default HouseholdResult;


