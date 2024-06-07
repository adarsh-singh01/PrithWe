import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import HouseholdResult from "./HouseholdResult";
import {
  calculateBusinessCarbonFootprint,
  calculateBusinessContributions,
} from "./CarbonCalculator";

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
  const [Recommendation,setRecommendation]=useState()

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
    let totalCarbonFootprint = calculateBusinessCarbonFootprint(formData);
    setTotalCarbonFootprint(totalCarbonFootprint);

    // Calculate contributions
    const calculatedContributions = calculateBusinessContributions(
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
      const result = response.data;
      setRecommendation(result)
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

  return (
    <div className="p-4  m-2 mt-10">
      {/* Render the result component only if showChart state is true */}
      {showChart && (
        <HouseholdResult
          totalCarbonFootprint={totalCarbonFootprint}
          contributions={contributions}
          Recommendation={Recommendation}
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
