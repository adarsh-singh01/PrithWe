import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import HouseholdResult from "./HouseholdResult";

function BusinessForm() {
  const [formData, setFormData] = useState({
    Electricity_Usage: "",
    Water_Usage: "",
    Paper_Consumption: "",
    Waste_Generation: "",
    Fuel_Consumption: "",
    Business_Travel: "",
  });
  const [totalCarbonFootprint, setTotalCarbonFootprint] = useState(null);
  const [contributions, setContributions] = useState([]);
  const [showChart, setShowChart] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCalculateCF = async (e) => {
    e.preventDefault();

    // Validation
    for (const key in formData) {
      const value = parseFloat(formData[key]);
      if (isNaN(value) || value < 0) {
        toast.error(`Invalid input for ${key}`);
        return;
      }
    }

    // Calculate the total carbon footprint
    let totalCarbonFootprint = calculateTotalCarbonFootprint(formData);
    setTotalCarbonFootprint(totalCarbonFootprint);

    // Calculate contributions
    const calculatedContributions = calculateContributions(
      formData,
      totalCarbonFootprint
    );
    setContributions(calculatedContributions);

    // Make API call to save data
    try {
      const response = await axios.post("api/business/saveData", {
        formData: formData,
        userId: await fetchUserId(),
      });
      toast.success("Calculated successfully");
      setShowChart(true);
    } catch (error) {
      console.error("Error saving data:", error);
      toast.info("Calculated...Login to view more");
    }
  };

  const fetchUserId = async () => {
    try {
      const response = await axios.get("/api/auth/login/status", {
        withCredentials: true,
      });
      console.log("trying to fetch id from household form");
      return response.data.id;
    } catch (error) {
      console.error("Error fetching user ID:", error);
      throw error;
    }
  };

  const getUnit = (fieldName) => {
    switch (fieldName) {
      case "Electricity_Usage":
        return "Kwh";
      case "Water_Usage":
        return "Gallon";
      case "Paper_Consumption":
        return "Kg";
      case "Waste_Generation":
        return "Tonne";
      case "Fuel_Consumption":
        return "Gallon";
      case "Business_Travel":
        return "Km";
      default:
        return "";
    }
  };

  const calculateTotalCarbonFootprint = (formData) => {
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

  const calculateContributions = (formData, totalCarbonFootprint) => {
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

  return (
    <div className="p-4  m-2 mt-10">
      {/* Render the result component only if showChart state is true */}
      {showChart && (
        <HouseholdResult
          totalCarbonFootprint={totalCarbonFootprint}
          contributions={contributions}
        />
      )}

      {!showChart && (
        <form
          onSubmit={handleCalculateCF}
          className="mx-auto p-2 md:p-4 w-fit bg-gray-200 rounded-lg shadow-lg"
        >
          {/* Form fields */}
          <div className="text-3xl md:text-4xl flex flex-col items-center justify-center p-4">
            <p>Business Form</p>
            <p className="text-base md:text-lg font-thin">
              Note : Fill your monthly data
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            {Object.keys(formData).map((key, index) => (
              <div key={index} className="mb-4">
                <label
                  htmlFor={key}
                  className="block text-sm font-medium text-gray-700"
                >
                  {key}
                </label>
                <input
                  type="text"
                  id={key}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-fit shadow-sm border border-gray-300 rounded-md"
                  placeholder={`Enter in ${getUnit(key)}`}
                />
              </div>
            ))}

            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-2"
            >
              Calculate Carbon Footprint
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default BusinessForm;

/*const allContributions2=[
  {label: "Electricity", value: electricityContribution},
  {label:"Water",value:waterContribution},
  { label: "Waste Generation", value: wasteContribution },
  { label: "Fuel Consumption", value: fuelContribution },
  { label: "Paper Consumption", value: paperContribution },
  { label : "Business Travel", value:Business_TravelContribution},
 
]*/
