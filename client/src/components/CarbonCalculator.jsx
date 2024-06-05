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
