import React, { useState } from "react";
import DoughnutChart from "./DoughnutChart";
import {
  calculateTotalCarbonFootprint,
  calculateContributions,
} from "./CarbonCalculator";

const HistoryComponent = ({ entry }) => {
  const [showChart, setShowChart] = useState(false);
  const [formData] = useState({
    electricityUsage: entry.electricity_usage,
    waterUsage: entry.water_usage,
    wasteGeneration: entry.waste_generation,
    gasCylinder: entry.gas_cylinder,
  });
  const [familyData] = useState(
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

  console.log(familyData, formData);
  const carbonFootprint = calculateTotalCarbonFootprint(formData, familyData);
  const contributions = calculateContributions(
    formData,
    familyData,
    carbonFootprint
  );

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
        <tr>
          <td colSpan="6">
            <table className="mx-auto">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Private Vehicle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Public Vehicle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Air Travel
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Veg Meals
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Non Veg Meals
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {familyData.map((data, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {data.name ? data.name : "NA"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {data.transportation.privateVehicle}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {data.transportation.publicVehicle}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {data.transportation.airTravel}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {data.food.vegMeals}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {data.food.nonVegMeals}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="flex justify-center items-center relative left-30 my-6">
                  <td className="mx-4">
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
              </tfoot>
            </table>
          </td>
        </tr>
      )}
    </>
  );
};

export default HistoryComponent;
