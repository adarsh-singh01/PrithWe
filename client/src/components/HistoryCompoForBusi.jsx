import React, { useState } from "react";
import DoughnutChart from "./DoughnutChart";
import {
  calculateBusinessCarbonFootprint,
  calculateBusinessContributions,
} from "./CarbonCalculator";

const HistoryComponent = ({ entry }) => {
  const [showChart, setShowChart] = useState(false);
  const [formData] = useState({
    Electricity_Usage: entry.electricity_usage,
    Water_Usage: entry.water_usage,
    Paper_Consumption: entry.paper_consumption,
    Waste_Generation: entry.waste_generation,
    Fuel_Consumption: entry.fuel_consumption,
    Business_Travel: entry.business_travel,
  });

  const carbonFootprint = calculateBusinessCarbonFootprint(formData);
  const contributions = calculateBusinessContributions(
    formData,
    carbonFootprint
  );

  return (
    <>
      <tr>
        <td className="px-6 py-4 whitespace-nowrap">
          {entry.id}
          </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {entry.electricity_usage}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {entry.water_usage}
          </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {entry.paper_consumption}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {entry.waste_generation}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {entry.fuel_consumption}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {entry.business_travel}
          </td>
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
        <tr className="flex justify-center items-center relative left-56 my-6">
          <td className="">
            <h3>Total Carbon Footprint</h3>
            <p className="text-xl font-medium">
              {Math.round(carbonFootprint * 100) / 100}
              <span className="font-thin">
                {" "}
                KgCO<sub>2</sub>
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
};

export default HistoryComponent;
