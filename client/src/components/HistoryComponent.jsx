import React, { useState } from 'react'
import DoughnutChart from "../components/DoughnutChart";
import {
  calculateTotalCarbonFootprint,
  calculateContributions,
} from "./CarbonCalculator";

const HistoryComponent = ({ entry }) => {

  const [showChart, setShowChart] = useState(false);
  const [formData,] = useState({
    electricityUsage: entry.electricity_usage,
    waterUsage: entry.water_usage,
    wasteGeneration: entry.waste_generation,
    gasCylinder: entry.gas_cylinder,
  });
  const [familyData,] = useState(
    entry.familyEntries.map((ent) => ({
      name: ent.name,
      transportation: {
        privateVehicle: ent.private_vehicle,
        publicVehicle: ent.public_vehicle,
        airTravel: ent.air_travel,
      },
      food: { vegMeals: ent.veg_meals, nonVegMeals: ent.non_veg_meals },
    }))
  );
  
  console.log(familyData,formData)
  const carbonFootprint = calculateTotalCarbonFootprint(formData, familyData);
  const contributions = calculateContributions(formData, familyData, carbonFootprint)
  
  return (
    <>
      <tr>
        <td className="px-6 py-4 whitespace-nowrap">{entry.id}</td>
        <td className="px-6 py-4 whitespace-nowrap">
          {entry.electricity_usage}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">{entry.water_usage}</td>
        <td className="px-6 py-4 whitespace-nowrap">
          {entry.waste_generation}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">{entry.gas_cylinder}</td>
        <td className="px-6 py-4 whitespace-nowrap">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => setShowChart(!showChart)}
          >
            {showChart ? "Hide" : "Show"}
          </button>
        </td>
      </tr>
        {showChart && (
          <tr className="flex justify-center items-center relative left-52 my-6">
              <td className=''>
                <h3 className=" mx-4">Total Carbon Footprint</h3>
                <p className="mx-4 text-xl font-medium ">
                  {Math.round(carbonFootprint * 100) / 100}
                  <span className="font-thin">
                {" "}KgCO<sub>2</sub>
                  </span>
                </p>
              </td>
              <td className="mt-4">
                <DoughnutChart contributions={contributions} />
              </td>
          </tr>
        )}
    </>
  );
}

export default HistoryComponent
