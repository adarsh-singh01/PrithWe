// Function to calculate total carbon footprint
export const calculateTotalCarbonFootprint = (formData, familyData) => {
  const emissionFactors = {
    electricityUsage: 0.82,
    waterUsage: 0.36,
    wasteGeneration: 0.5,
    gasCylinder: 2.98,
    privateVehicle: 2.3,
    publicVehicle: 0.015,
    airTravel: 0.24,
    vegMeal: 2.5,
    nonVegMeal: 7,
  };

  let commonCarbonFootprint = Object.keys(formData).reduce((total, key) => {
    return total + parseFloat(formData[key]) * emissionFactors[key];
  }, 0);

  const familyCarbonFootprints = familyData.map((member) => {
    const transportationFootprint =
      parseFloat(member.transportation.privateVehicle) *
        emissionFactors.privateVehicle +
      parseFloat(member.transportation.publicVehicle) *
        emissionFactors.publicVehicle +
      parseFloat(member.transportation.airTravel) * emissionFactors.airTravel;
    const foodFootprint =
      parseFloat(member.food.vegMeals) * emissionFactors.vegMeal +
      parseFloat(member.food.nonVegMeals) * emissionFactors.nonVegMeal;
    return transportationFootprint + foodFootprint;
  });

  const totalCarbonFootprint =
    commonCarbonFootprint +
    familyCarbonFootprints.reduce((total, footprint) => total + footprint, 0);

  return totalCarbonFootprint;
};

// Function to calculate contributions
export const calculateContributions = (
  formData,
  familyData,
  totalCarbonFootprint
) => {
  const emissionFactors = {
    electricityUsage: 0.82,
    waterUsage: 0.36,
    wasteGeneration: 0.5,
    gasCylinder: 2.98,
    privateVehicle: 2.3,
    publicVehicle: 0.015,
    airTravel: 0.24,
    vegMeal: 2.5,
    nonVegMeal: 7,
  };

  const electricityContribution =
    ((parseFloat(formData.electricityUsage) *
      emissionFactors.electricityUsage) /
      totalCarbonFootprint) *
    100;
  const waterContribution =
    ((parseFloat(formData.waterUsage) * emissionFactors.waterUsage) /
      totalCarbonFootprint) *
    100;
  const wasteContribution =
    ((parseFloat(formData.wasteGeneration) * emissionFactors.wasteGeneration) /
      totalCarbonFootprint) *
    100;
  const gasContribution =
    ((parseFloat(formData.gasCylinder) * emissionFactors.gasCylinder) /
      totalCarbonFootprint) *
    100;

  let vegFootprint = 0;
  let nonVegFootprint = 0;
  let privateFootprint = 0;
  let publicFootprint = 0;
  let airFootprint = 0;

  familyData.forEach((member) => {
    vegFootprint +=
      ((parseFloat(member.food.vegMeals) * emissionFactors.vegMeal) /
        totalCarbonFootprint) *
      100;
    nonVegFootprint +=
      ((parseFloat(member.food.nonVegMeals) * emissionFactors.nonVegMeal) /
        totalCarbonFootprint) *
      100;
    privateFootprint +=
      ((parseFloat(member.transportation.privateVehicle) *
        emissionFactors.privateVehicle) /
        totalCarbonFootprint) *
      100;
    publicFootprint +=
      ((parseFloat(member.transportation.publicVehicle) *
        emissionFactors.publicVehicle) /
        totalCarbonFootprint) *
      100;
    airFootprint +=
      ((parseFloat(member.transportation.airTravel) *
        emissionFactors.airTravel) /
        totalCarbonFootprint) *
      100;
  });

  const allContributions = [
    { name: "Electricity", y: electricityContribution },
    { name: "Water", y: waterContribution },
    { name: "Waste Generation", y: wasteContribution },
    { name: "Gas Cylinder", y: gasContribution },
    { name: "Veg Food", y: vegFootprint },
    { name: "Non-Veg Food", y: nonVegFootprint },
    { name: "Public Transportation", y: publicFootprint },
    { name: "Private Transportation", y: privateFootprint },
    { name: "Air Transportation", y: airFootprint },
  ];

  return allContributions;
};

 export const calculateBusinessCarbonFootprint = (formData) => {
   // Define emission factors for each input
   const emissionFactors = {
     Electricity_Usage: 0.82,
     Water_Usage: 0.36,
     Paper_Consumption: 0.5,
     Waste_Generation: 0.5,
     Fuel_Consumption: 2.98,
     Business_Travel: 0.24,
   };

   const conversionFactors = {
     Water_Usage: 3.78541,
     Waste_Generation: 1000, // 1 tonne = 1000 kg
     Fuel_Consumption: 3.78541, // 1 gallon = 3.78541 liters
   };

   // Calculate carbon footprint
   /*let totalCarbonFootprint = Object.keys(formData).reduce((total, key) => {
      return total + (parseFloat(formData[key]) * emissionFactors[key]);
    }, 0);*/
   // Calculate carbon footprint
   let totalCarbonFootprint = Object.keys(formData).reduce((total, key) => {
     // Apply conversion factor if input is in tonnes or gallons
     const convertedValue = conversionFactors[key]
       ? parseFloat(formData[key]) * conversionFactors[key]
       : parseFloat(formData[key]);
     return total + convertedValue * emissionFactors[key];
   }, 0);
   return totalCarbonFootprint;
 };

 export const calculateBusinessContributions = (formData, totalCarbonFootprint) => {
   // Define emission factors for each input
   const emissionFactors = {
     Electricity_Usage: 0.82,
     Water_Usage: 0.36,
     Paper_Consumption: 0.5,
     Waste_Generation: 0.5,
     Fuel_Consumption: 2.98,
     Business_Travel: 0.24,
   };

   const conversionFactors = {
     Water_Usage: 3.78541,
     Waste_Generation: 1000, // 1 tonne = 1000 kg
     Fuel_Consumption: 3.78541, // 1 gallon = 3.78541 liters
   };

   // Calculate the total emissions for each parameter
   const totalEmissions = {
     Electricity_Usage:
       parseFloat(formData.Electricity_Usage) *
       emissionFactors.Electricity_Usage,
     Water_Usage:
       parseFloat(formData.Water_Usage) * emissionFactors.Water_Usage,
     Paper_Consumption:
       parseFloat(formData.Paper_Consumption) *
       emissionFactors.Paper_Consumption,
     Waste_Generation:
       parseFloat(formData.Waste_Generation) *
       emissionFactors.Waste_Generation *
       conversionFactors.Waste_Generation,
     Fuel_Consumption:
       parseFloat(formData.Fuel_Consumption) *
       emissionFactors.Fuel_Consumption *
       conversionFactors.Fuel_Consumption,
     Business_Travel:
       parseFloat(formData.Business_Travel) * emissionFactors.Business_Travel,
   };
   // Calculate the total emissions
   const totalEmissionsSum = Object.values(totalEmissions).reduce(
     (sum, value) => sum + value,
     0
   );

   // Calculate contributions based on total emissions
   const allContributions = Object.keys(totalEmissions).map((key) => ({
     name: key.replace(/_/g, " "), // Replace underscores with spaces for display
     y: (totalEmissions[key] / totalEmissionsSum) * 100,
   }));

   return allContributions;
   // Calculate contributions
   /*const allContributions = Object.keys(formData).map(key => ({
      label: key,
      value: (parseFloat(formData[key]) * emissionFactors[key]) / totalCarbonFootprint * 100
    }));*/

   /*return allContributions;*/
 };