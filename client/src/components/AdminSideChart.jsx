import React, { useState } from "react";
import DoughnutChart from "./DoughnutChart";
import {
  calculateTotalCarbonFootprint,
  calculateContributions,
} from "./CarbonCalculator";

const AdminSideChart = ({ entry }) => { 
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
          <DoughnutChart contributions={contributions} />
               
    </>
  );
};

export default AdminSideChart;
