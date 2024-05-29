import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HouseholdResult from './HouseholdResult';

function BusinessForm() {
  const [formData, setFormData] = useState({
    Electricity_Usage: '',
    Water_Usage: '',
    Paper_Consumption: '',
    Waste_Generation: '',
    Fuel_Consumption: '',
    Business_Travel: ''
  });

  const [errors, setErrors] = useState({
    Electricity_Usage: '',
    Water_Usage: '',
    Paper_Consumption: '',
    Waste_Generation: '',
    Fuel_Consumption: '',
    Business_Travel: ''
  });

  const [totalCarbonFootprint, setTotalCarbonFootprint] = useState(null);
  const [contributions, setContributions] = useState([]);
  const [showChart, setShowChart] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
    validateInput(name, value);
  };

  const validateInput = (name, value) => {
    if (!/^\d*\.?\d+$/.test(value)) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: 'Invalid input, please enter a number' }));
    } else {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    }
  };

  const validateInputs = () => {
    for (const key in formData) {
      if (errors[key]) {
        return false;
      }
    }
    return true;
  };

  const handleCalculateCF = async (e) => {
    e.preventDefault();
    if (validateInputs()) {
      const totalCF = calculateTotalCarbonFootprint();
      setTotalCarbonFootprint(totalCF);
      setContributions(calculateContributions(totalCF));
      await saveData();
    }
  };

  const emissionFactors = {
    Electricity_Usage: 0.82,
    Water_Usage: 0.36,
    Paper_Consumption: 0.5,
    Waste_Generation: 0.5,
    Fuel_Consumption: 2.98,
    Business_Travel: 0.24
  };

  const conversionFactors = {
    Water_Usage: 3.78541,
    Waste_Generation: 1000,
    Fuel_Consumption: 3.78541
  };

  const calculateTotalCarbonFootprint = () => {
    return Object.keys(formData).reduce((total, key) => {
      const value = parseFloat(formData[key]);
      const convertedValue = conversionFactors[key] ? value * conversionFactors[key] : value;
      return total + (convertedValue * emissionFactors[key]);
    }, 0);
  };

  const calculateContributions = (totalCF) => {
    return Object.keys(formData).map(key => ({
      name: key.replace(/_/g, ' '),
      y: (parseFloat(formData[key]) * emissionFactors[key] / totalCF) * 100
    }));
  };

  const saveData = async () => {
    try {
      const userId = await fetchUserId();
      await axios.post('/api/business/saveData', { formData, userId });
      setShowChart(true);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const fetchUserId = async () => {
    try {
      const response = await axios.get('/api/auth/login/status', { withCredentials: true });
      return response.data.id;
    } catch (error) {
      console.error('Error fetching user ID:', error);
      throw error;
    }
  };

  const getUnit = (fieldName) => {
    const units = {
      Electricity_Usage: 'kWh',
      Water_Usage: 'gallons',
      Paper_Consumption: 'kg',
      Waste_Generation: 'tonnes',
      Fuel_Consumption: 'gallons',
      Business_Travel: 'km'
    };
    return units[fieldName] || '';
  };

  return (
    <div className="p-4 m-2 mt-10">
      <ToastContainer autoClose={4000} position="top-center" newestOnTop/>

      {showChart && <HouseholdResult totalCarbonFootprint={totalCarbonFootprint} contributions={contributions} />}

      {!showChart && (
        <form onSubmit={handleCalculateCF} className="mx-auto p-2 md:p-4 w-fit bg-gray-200 rounded-lg shadow-lg">
          <div className='text-3xl md:text-4xl flex flex-col items-center justify-center p-4'>
            <p>Business Carbon Footprint Form</p>
            <p className='text-base md:text-lg font-thin'>Note: Fill in your monthly data</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            {Object.keys(formData).map((key, index) => (
              <div key={index} className="mb-4">
                <label htmlFor={key} className="block text-sm font-medium text-gray-700">{key.replace(/_/g, ' ')}</label>
                <input
                  type="text"
                  id={key}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full shadow-sm border border-gray-300 rounded-md"
                  placeholder={`Enter in ${getUnit(key)}`}
                />
                {errors[key] && <p className="text-red-500 text-xs italic">{errors[key]}</p>}
              </div>
            ))}
            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-2">
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