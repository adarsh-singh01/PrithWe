import React, { useState } from "react";
import DoughnutChart from "./DoughnutChart";
import {
  calculateBusinessCarbonFootprint,
  calculateBusinessContributions,
} from "./CarbonCalculator";
import {
  calculateTotalCarbonFootprint,
  calculateContributions,
} from "./CarbonCalculator";

const AdminSideChart = ({ entry,setBusinessCarbonFootPrint }) => {
  var contributions;
  if (entry.business_travel === undefined) {
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
     contributions = calculateContributions(
      formData,
      familyData,
      carbonFootprint
    );
  }
  else {
    const [formData] = useState({
      Electricity_Usage: entry.electricity_usage,
      Water_Usage: entry.water_usage,
      Paper_Consumption: entry.paper_consumption,
      Waste_Generation: entry.waste_generation,
      Fuel_Consumption: entry.fuel_consumption,
      Business_Travel: entry.business_travel,
    });

    const carbonFootprint = calculateBusinessCarbonFootprint(formData);
    setBusinessCarbonFootPrint(carbonFootprint)
     contributions = calculateBusinessContributions(
      formData,
      carbonFootprint
    );
  }

  return (
    <>
      <DoughnutChart contributions={contributions} />

    </>
  );
};

export default AdminSideChart;
