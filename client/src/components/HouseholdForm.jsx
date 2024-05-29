import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HouseholdResult from './HouseholdResult';

function HouseholdForm() {
  const [formData, setFormData] = useState({
    electricityUsage: '',
    waterUsage: '',
    wasteGeneration: '',
    gasCylinder: ''
  });

  const [numFamilyMembers, setNumFamilyMembers] = useState('');
  const [familyData, setFamilyData] = useState([]);
  const [contributions, setContributions] = useState([]);
  const [totalCarbonFootprint, setTotalCarbonFootprint] = useState(null);
  const [showChart, setShowChart] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (index, key, value) => {
    const updatedFamilyData = [...familyData];
    updatedFamilyData[index][key] = value;
    setFamilyData(updatedFamilyData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (!/^\d*\.?\d*$/.test(value)) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: 'Please enter a valid number' }));
    } else {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleFamilyInputChange = (index, category, key, value) => {
    if (!/^\d*\.?\d*$/.test(value)) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [`${category}-${index}-${key}`]: 'Please enter a valid number'
      }));
    } else {
      setErrors(prevErrors => ({
        ...prevErrors,
        [`${category}-${index}-${key}`]: ''
      }));
      const updatedFamilyData = [...familyData];
      updatedFamilyData[index][category][key] = value;
      setFamilyData(updatedFamilyData);
    }
  };

  const handleFamilySubmit = (e) => {
    e.preventDefault();
    const num = parseInt(numFamilyMembers, 10);
    if (isNaN(num) || num < 1) {
      toast.error('Please enter a valid number of family members.');
      return;
    }
    const initialFamilyData = Array.from({ length: num }, () => ({
      name: '',
      transportation: { privateVehicle: '', publicVehicle: '', airTravel: '' },
      food: { vegMeals: '', nonVegMeals: '' },
    }));
    setFamilyData(initialFamilyData);
  };

  const handleCalculateCF = async (e) => {
    e.preventDefault();

    if (familyData.length === 0) {
      toast.error('Click on Next and Enter family member information before calculating.');
      return;
    }

    // Validation for common form data
    for (const key in formData) {
      const value = parseFloat(formData[key]);
      if (isNaN(value) || value < 0) {
        toast.error(`Invalid input for ${key}`);
        return;
      }
    }

    // Validation for family member data
    for (const member of familyData) {
      for (const category in member) {
        if (category === 'name' && member[category].trim() === '') continue;
        for (const key in member[category]) {
          const value = parseFloat(member[category][key]);
          if (isNaN(value) || value < 0) {
            toast.error(`Invalid input for ${member.name || `Member ${familyData.indexOf(member) + 1}`}'s ${category} - ${key}`);
            return;
          }
        }
      }
    }

    // Calculate the total carbon footprint
    const totalCarbonFootprint = calculateTotalCarbonFootprint(formData, familyData);
    setTotalCarbonFootprint(totalCarbonFootprint);

    // Calculate contributions
    const calculatedContributions = calculateContributions(formData, familyData, totalCarbonFootprint);
    setContributions(calculatedContributions);

    // Make API call to save data
    try {
      const userId = await fetchUserId();
      await axios.post('/api/household/saveData', {
        commonFormData: formData,
        familyFormData: familyData,
        userId
      });
      toast.success('Calculated successfully');
      setShowChart(true);
    } catch (error) {
      console.error('Error saving data:', error);
      toast.info('Calculated...Login to view more');
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

  const calculateTotalCarbonFootprint = (formData, familyData) => {
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

    const commonCarbonFootprint = Object.keys(formData).reduce((total, key) => {
      return total + (parseFloat(formData[key]) * emissionFactors[key]);
    }, 0);

    const familyCarbonFootprints = familyData.map(member => {
      const transportationFootprint = (parseFloat(member.transportation.privateVehicle) * emissionFactors.privateVehicle) +
                                      (parseFloat(member.transportation.publicVehicle) * emissionFactors.publicVehicle) +
                                      (parseFloat(member.transportation.airTravel) * emissionFactors.airTravel);
      const foodFootprint = (parseFloat(member.food.vegMeals) * emissionFactors.vegMeal) +
                            (parseFloat(member.food.nonVegMeals) * emissionFactors.nonVegMeal);
      return transportationFootprint + foodFootprint;
    });

    const totalCarbonFootprint = commonCarbonFootprint + familyCarbonFootprints.reduce((total, footprint) => total + footprint, 0);

    return totalCarbonFootprint;
  };

  const calculateContributions = (formData, familyData, totalCarbonFootprint) => {
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

    const electricityContribution = (parseFloat(formData.electricityUsage) * emissionFactors.electricityUsage) / totalCarbonFootprint * 100;
    const waterContribution = (parseFloat(formData.waterUsage) * emissionFactors.waterUsage) / totalCarbonFootprint * 100;
    const wasteContribution = (parseFloat(formData.wasteGeneration) * emissionFactors.wasteGeneration) / totalCarbonFootprint * 100;
    const gasContribution = (parseFloat(formData.gasCylinder) * emissionFactors.gasCylinder) / totalCarbonFootprint * 100;

    let vegFootprint = 0;
    let nonVegFootprint = 0;
    let privateFootprint = 0;
    let publicFootprint = 0;
    let airFootprint = 0;

    familyData.forEach(member => {
      vegFootprint += (parseFloat(member.food.vegMeals) * emissionFactors.vegMeal) / totalCarbonFootprint * 100;
      nonVegFootprint += (parseFloat(member.food.nonVegMeals) * emissionFactors.nonVegMeal) / totalCarbonFootprint * 100;
      privateFootprint += (parseFloat(member.transportation.privateVehicle) * emissionFactors.privateVehicle) / totalCarbonFootprint * 100;
      publicFootprint += (parseFloat(member.transportation.publicVehicle) * emissionFactors.publicVehicle) / totalCarbonFootprint * 100;
      airFootprint += (parseFloat(member.transportation.airTravel) * emissionFactors.airTravel) / totalCarbonFootprint * 100;
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
      { name: "Air Transportation", y: airFootprint }
    ];

    return allContributions;
  };

  return (
    <div className="p-4 m-2 mt-10">
      <ToastContainer autoClose={4000} position="top-center" newestOnTop />
      {showChart ? (
        <HouseholdResult contributions={contributions} totalCarbonFootprint={totalCarbonFootprint} />
      ) : (
        <form onSubmit={handleCalculateCF} className='max-w-md mx-auto bg-white p-6 rounded shadow'>
          <div className='text-center text-2xl font-bold mb-4'>
            <p>Household Carbon Footprint</p>
            <p>Calculator</p>
          </div>
          <div className='mb-4'>
            <label className='block mb-2 text-lg font-medium'>Electricity Usage (kWh per month):</label>
            <input type="text" name="electricityUsage" value={formData.electricityUsage} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
            {errors.electricityUsage && <p className="text-red-500 text-sm">{errors.electricityUsage}</p>}
          </div>
          <div className='mb-4'>
            <label className='block mb-2 text-lg font-medium'>Water Usage (litres per month):</label>
            <input type="text" name="waterUsage" value={formData.waterUsage} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
            {errors.waterUsage && <p className="text-red-500 text-sm">{errors.waterUsage}</p>}
          </div>
          <div className='mb-4'>
            <label className='block mb-2 text-lg font-medium'>Waste Generation (kg per month):</label>
            <input type="text" name="wasteGeneration" value={formData.wasteGeneration} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
            {errors.wasteGeneration && <p className="text-red-500 text-sm">{errors.wasteGeneration}</p>}
          </div>
          <div className='mb-4'>
            <label className='block mb-2 text-lg font-medium'>LPG Usage (number of cylinders per month):</label>
            <input type="text" name="gasCylinder" value={formData.gasCylinder} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
            {errors.gasCylinder && <p className="text-red-500 text-sm">{errors.gasCylinder}</p>}
          </div>
          <div className='mb-4'>
            <label className='block mb-2 text-lg font-medium'>Number of Family Members:</label>
            <input type="text" value={numFamilyMembers} onChange={(e) => setNumFamilyMembers(e.target.value)} className="w-full p-2 border border-gray-300 rounded" />
            <button type="button" onClick={handleFamilySubmit} className='mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>Next</button>
            {errors.numFamilyMembers && <p className="text-red-500 text-sm">{errors.numFamilyMembers}</p>}
          </div>
          {familyData.length > 0 && (
            <div>
              {familyData.map((member, index) => (
                <div key={index} className="mb-4">
                  <div className='mb-4'>
                    <label className='block mb-2 text-lg font-medium'>Family Member {index + 1} Name:</label>
                    <input type="text" value={member.name} onChange={(e) => handleInputChange(index, 'name', e.target.value)} className="w-full p-2 border border-gray-300 rounded" />
                  </div>
                  <div className='mb-4'>
                    <label className='block mb-2 text-lg font-medium'>Private Vehicle Travel (km per month):</label>
                    <input type="text" value={member.transportation.privateVehicle} onChange={(e) => handleFamilyInputChange(index, 'transportation', 'privateVehicle', e.target.value)} className="w-full p-2 border border-gray-300 rounded" />
                    {errors[`transportation-${index}-privateVehicle`] && <p className="text-red-500 text-sm">{errors[`transportation-${index}-privateVehicle`]}</p>}
                  </div>
                  <div className='mb-4'>
                    <label className='block mb-2 text-lg font-medium'>Public Vehicle Travel (km per month):</label>
                    <input type="text" value={member.transportation.publicVehicle} onChange={(e) => handleFamilyInputChange(index, 'transportation', 'publicVehicle', e.target.value)} className="w-full p-2 border border-gray-300 rounded" />
                    {errors[`transportation-${index}-publicVehicle`] && <p className="text-red-500 text-sm">{errors[`transportation-${index}-publicVehicle`]}</p>}
                  </div>
                  <div className='mb-4'>
                    <label className='block mb-2 text-lg font-medium'>Air Travel (km per year):</label>
                    <input type="text" value={member.transportation.airTravel} onChange={(e) => handleFamilyInputChange(index, 'transportation', 'airTravel', e.target.value)} className="w-full p-2 border border-gray-300 rounded" />
                    {errors[`transportation-${index}-airTravel`] && <p className="text-red-500 text-sm">{errors[`transportation-${index}-airTravel`]}</p>}
                  </div>
                  <div className='mb-4'>
                    <label className='block mb-2 text-lg font-medium'>Number of Veg Meals per Week:</label>
                    <input type="text" value={member.food.vegMeals} onChange={(e) => handleFamilyInputChange(index, 'food', 'vegMeals', e.target.value)} className="w-full p-2 border border-gray-300 rounded" />
                    {errors[`food-${index}-vegMeals`] && <p className="text-red-500 text-sm">{errors[`food-${index}-vegMeals`]}</p>}
                  </div>
                  <div className='mb-4'>
                    <label className='block mb-2 text-lg font-medium'>Number of Non-Veg Meals per Week:</label>
                    <input type="text" value={member.food.nonVegMeals} onChange={(e) => handleFamilyInputChange(index, 'food', 'nonVegMeals', e.target.value)} className="w-full p-2 border border-gray-300 rounded" />
                    {errors[`food-${index}-nonVegMeals`] && <p className="text-red-500 text-sm">{errors[`food-${index}-nonVegMeals`]}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className='flex justify-center'>
            <button type="submit" className='mt-4 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600'>Calculate</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default HouseholdForm;


{/*{!showChart && (<div className="mt-2 mb-8  grid grid-cols-1 md:grid-cols-3 gap-4  ">
  
  {familyData.map((member, index) => (
    <div key={index} className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-4">Member : {member.name ? member.name : index + 1}</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={member.name}
          onChange={(e) => handleInputChange(index, 'name', e.target.value)}
          placeholder="Enter Name"
          className="mt-1 p-2 block w-full shadow-sm border border-gray-300 rounded-md"
        />
        <label className=" text-sm font-medium text-gray-700 flex items-center">Transportation :<p className='ml-1 text-xs'>Enter Distance Travelled in Km</p></label>
        <div className="flex space-x-4">
          <input
            type="text"
            value={member.transportation.privateVehicle}
            onChange={(e) => handleInputChange(index, 'transportation', { ...member.transportation, privateVehicle: e.target.value })}
            placeholder="Private Vehicle"
            className="mt-1 p-2 block w-full shadow-sm border border-gray-300 rounded-md"
          />
          <input
            type="text"
            value={member.transportation.publicVehicle}
            onChange={(e) => handleInputChange(index, 'transportation', { ...member.transportation, publicVehicle: e.target.value })}
            placeholder="Public Vehicle"
            className="mt-1 p-2 block w-full shadow-sm border border-gray-300 rounded-md"
          />
          <input
            type="text"
            value={member.transportation.airTravel}
            onChange={(e) => handleInputChange(index, 'transportation', { ...member.transportation, airTravel: e.target.value })}
            placeholder="Air Travel"
            className="mt-1 p-2 block w-full shadow-sm border border-gray-300 rounded-md"
          />
        </div>
        <label className="flex items-center text-sm font-medium text-gray-700">Food :<p className='text-xs ml-1'>Enter No. of Meals</p></label>
        <div className="flex space-x-4">
          <input
            type="text"
            value={member.food.vegMeals}
            onChange={(e) => handleInputChange(index, 'food', { ...member.food, vegMeals: e.target.value })}
            placeholder="Veg Meals"
            className="mt-1 p-2 block w-full shadow-sm border border-gray-300 rounded-md"
          />
          <input
            type="text"
            value={member.food.nonVegMeals}
            onChange={(e) => handleInputChange(index, 'food', { ...member.food, nonVegMeals: e.target.value })}
            placeholder="Non-Veg Meals"
            className="mt-1 p-2 block w-full shadow-sm border border-gray-300 rounded-md"
          />
        </div>
      </div>
    </div>
  ))}
</div>)}*/}
/*const calculateContributions = (formData, familyData) => {
  // Define emission factors for each input
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

  // Calculate contributions for common form data
  // Calculate contributions for each factor (excluding food and transportation)
  const electricityContribution = (parseFloat(formData.electricityUsage) * emissionFactors.electricityUsage) / totalCarbonFootprint * 100;
  const waterContribution = (parseFloat(formData.waterUsage) * emissionFactors.waterUsage) / totalCarbonFootprint * 100;
  const wasteContribution = (parseFloat(formData.wasteGeneration) * emissionFactors.wasteGeneration) / totalCarbonFootprint * 100;
  const gasContribution = (parseFloat(formData.gasCylinder) * emissionFactors.gasCylinder) / totalCarbonFootprint * 100;

  // Calculate contributions for food and transportation
  //let foodFootprint = 0;
  let vegFootprint=0;
  let nonVegFootprint = 0;
  //let transportationFootprint=0;
  let privateFootprint=0;
  let publicFootprint=0;
  let airFootprint=0;

  familyData.forEach(member => {
    // Food contribution
    //foodFootprint += ((parseFloat(member.food.vegMeals) * emissionFactors.vegMeal) + (parseFloat(member.food.nonVegMeals) * emissionFactors.nonVegMeal)) / totalCarbonFootprint * 100;
    vegFootprint +=((parseFloat(member.food.vegMeals) * emissionFactors.vegMeal))/totalCarbonFootprint*100;
    nonVegFootprint +=((parseFloat(member.food.nonVegMeals) * emissionFactors.nonVegMeal))/totalCarbonFootprint*100;
    // Transportation contribution
    /*transportationFootprint += ((parseFloat(member.transportation.privateVehicle) * emissionFactors.privateVehicle) +
                               (parseFloat(member.transportation.publicVehicle) * emissionFactors.publicVehicle) +
                               (parseFloat(member.transportation.airTravel) * emissionFactors.airTravel)) / totalCarbonFootprint * 100; //here will be a comment closing tag.

                               privateFootprint+=(parseFloat(member.transportation.privateVehicle) * emissionFactors.privateVehicle)/ totalCarbonFootprint * 100;
                               publicFootprint+=(parseFloat(member.transportation.publicVehicle) * emissionFactors.publicVehicle)/ totalCarbonFootprint * 100;
                               airFootprint+=(parseFloat(member.transportation.airTravel) * emissionFactors.airTravel)/totalCarbonFootprint * 100;
                           
                             });
                           
                             // Combine all contributions into an object
                             /*const allContributions = [
                               { label: "Electricity Usage", value: electricityContribution },
                               { label: "Water Usage", value: waterContribution },
                               { label: "Waste Generation", value: wasteContribution },
                               { label: "Gas Cylinder", value: gasContribution },
                               { label: "Veg Food", value: vegFootprint },
                               {label :"NonVeg Food", value:nonVegFootprint},
                               { label: "Public  Transportation", value:publicFootprint },
                               {label:"Private Transportation", value:privateFootprint },
                               {label : "Air Transportation", value:airFootprint}
                           
                             ];*/
                           
                             /*const allContributions2=[
                               {name: "Electricity", y: electricityContribution},
                               {name:"Water",y:waterContribution},
                               { name: "Waste Generation", y: wasteContribution },
                               { name: "Gas Cylinder", y: gasContribution },
                               { name: "Veg Food", y: vegFootprint },
                               { name : "Non-Veg Food", y:nonVegFootprint},
                               { name: "Public  Transportation", y:publicFootprint },
                               {name: "Private Transportation", y:privateFootprint },
                               {name : "Air Transportation", y:airFootprint}
                             ]*/
                           
                             //return allContributions2
                           // };

/*import React, { useState } from 'react';
import axios from 'axios'; // Import axios

function HouseholdForm() {
  const [formData, setFormData] = useState({
    electricityUsage: '',
    waterUsage: '',
    wasteGeneration: '',
    gasCylinder: ''
  });

  const [numFamilyMembers, setNumFamilyMembers] = useState(0);
  const [familyData, setFamilyData] = useState([]);
  const [totalCarbonFootprint, setTotalCarbonFootprint] = useState(null); // State variable to store the total carbon footprint

  const handleInputChange = (index, key, value) => {
    const updatedFamilyData = [...familyData];
    updatedFamilyData[index][key] = value;
    setFamilyData(updatedFamilyData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFamilySubmit = (e) => {
    e.preventDefault();
    const initialFamilyData = Array.from({ length: numFamilyMembers }, () => ({
      name: '',
      transportation: { privateVehicle: '', publicVehicle: '', airTravel: '' },
      food: { vegMeals: '', nonVegMeals: '' },
    }));
    setFamilyData(initialFamilyData);
  };

  // Modify the handleCalculateCF function in your frontend code
  const handleCalculateCF = async (e) => {
    e.preventDefault();
    // Send both common form data and family form data to backend
    console.log('Common Form Data:', formData);
    console.log('Family Form Data:', familyData);

    // Calculate the total carbon footprint
    let totalCarbonFootprint = calculateTotalCarbonFootprint(formData, familyData);

    // Display the calculated carbon footprint to the user
    console.log('Total Carbon Footprint:', totalCarbonFootprint);
    setTotalCarbonFootprint(totalCarbonFootprint); // Update the state variable

    // Fetch user ID from the server or from session
    const userId = await fetchUserId(); // Await the result of fetchUserId

    // Prepare the request body with common form data, family form data, and user ID
    const requestData = {
      commonFormData: formData,
      familyFormData: familyData,
      userId: userId
    };

    try {
      console.log(userId)
      const response = await axios.post('http://localhost:3003/saveData', requestData);
      console.log('Response from server:', response.data);
      // Handle success response
    } catch (error) {
      console.error('Error saving data:', error);
      // Handle error
    }
  };

  // Function to fetch user ID from the server
  const fetchUserId = async () => {
    try {
      const response = await axios.get('http://localhost:3001/login/status', { withCredentials: true });
      //console.log(response.data.id);
      return response.data.id; // Assuming the user ID is returned in the response data

    } catch (error) {
      console.error('Error fetching user ID:', error);
      throw error; // Throw the error to be caught by the caller
    }
  };

  // Function to calculate the total carbon footprint
  const calculateTotalCarbonFootprint = (formData, familyData) => {
    // Define emission factors for each input
    const emissionFactors = {
      electricityUsage: 0.82, // Example emission factor for electricity usage
      waterUsage: 0.36, // Example emission factor for water usage
      wasteGeneration: 0.5, // Example emission factor for waste generation
      gasCylinder: 2.98, // Example emission factor for gas cylinder usage
      privateVehicle: 2.3, // Example emission factor for private vehicle transportation
      publicVehicle: 0.015, // Example emission factor for public vehicle transportation
      airTravel: 0.24, // Example emission factor for air travel
      vegMeal: 2.5, // Example emission factor for a vegetarian meal
      nonVegMeal: 7, // Example emission factor for a non-vegetarian meal
    };

    // Calculate carbon footprint for common form data
    let commonCarbonFootprint = Object.keys(formData).reduce((total, key) => {
      return total + (parseFloat(formData[key]) * emissionFactors[key]);
    }, 0);

    // Calculate carbon footprint for each family member
    const familyCarbonFootprints = familyData.map(member => {
      const transportationFootprint = (parseFloat(member.transportation.privateVehicle) * emissionFactors.privateVehicle) +
                                      (parseFloat(member.transportation.publicVehicle) * emissionFactors.publicVehicle) +
                                      (parseFloat(member.transportation.airTravel) * emissionFactors.airTravel);
      const foodFootprint = (parseFloat(member.food.vegMeals) * emissionFactors.vegMeal) +
                            (parseFloat(member.food.nonVegMeals) * emissionFactors.nonVegMeal);
      return transportationFootprint + foodFootprint;
    });

    // Calculate total carbon footprint by summing common and family footprints
    const totalCarbonFootprint = commonCarbonFootprint + familyCarbonFootprints.reduce((total, footprint) => total + footprint, 0);

    return totalCarbonFootprint;
  };

  return (
    <div className="container mx-auto mt-10">
      <form onSubmit={handleCalculateCF} className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Calculate Your Carbon Footprint</h2>

        // Common form fields 
        <div className="mb-4">
          <label htmlFor="electricityUsage" className="block text-sm font-medium text-gray-700">Electricity Usage</label>
          <input
            type="text"
            id="electricityUsage"
            name="electricityUsage"
            value={formData.electricityUsage}
            onChange={handleChange}
            className="mt-1 p-2 block w-full shadow-sm border border-gray-300 rounded-md"
            placeholder="Enter electricity usage"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="waterUsage" className="block text-sm font-medium text-gray-700">Water Usage</label>
          <input
            type="text"
            id="waterUsage"
            name="waterUsage"
            value={formData.waterUsage}
            onChange={handleChange}
            className="mt-1 p-2 block w-full shadow-sm border border-gray-300 rounded-md"
            placeholder="Enter water usage"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="wasteGeneration" className="block text-sm font-medium text-gray-700">Waste Generation</label>
          <input
            type="text"
            id="wasteGeneration"
            name="wasteGeneration"
            value={formData.wasteGeneration}
            onChange={handleChange}
            className="mt-1 p-2 block w-full shadow-sm border border-gray-300 rounded-md"
            placeholder="Enter waste generation"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="gasCylinder" className="block text-sm font-medium text-gray-700">Gas Cylinder</label>
          <input
            type="text"
            id="gasCylinder"
            name="gasCylinder"
            value={formData.gasCylinder}
            onChange={handleChange}
            className="mt-1 p-2 block w-full shadow-sm border border-gray-300 rounded-md"
            placeholder="Enter gas cylinder usage"
          />
        </div>

        // Number of family members form 
        <div className="mb-4">
          <label htmlFor="numFamilyMembers" className="block text-sm font-medium text-gray-700">How many members are in your family?</label>
          <input
            type="number"
            id="numFamilyMembers"
            value={numFamilyMembers}
            onChange={(e) => setNumFamilyMembers(parseInt(e.target.value))}
            className="border border-gray-300 rounded-md px-2 py-1 mb-4"
          />
          <button onClick={handleFamilySubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Next</button>
        </div>

        // Calculate Carbon Footprint button 
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Calculate Carbon Footprint</button>

        // Display the total carbon footprint 
        {totalCarbonFootprint !== null && (
          <div className="mt-4">
            <h3 className="text-lg font-bold mb-2">Total Carbon Footprint</h3>
            <p>{totalCarbonFootprint} units</p>
          </div>
        )}
      </form>

      // Family member cards 
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {familyData.map((member, index) => (
          <div key={index} className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Member : {member.name ? member.name : index + 1}</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={member.name}
                onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                placeholder="Enter Name"
                className="mt-1 p-2 block w-full shadow-sm border border-gray-300 rounded-md"
              />
              <label className="block text-sm font-medium text-gray-700">Transportation</label>
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={member.transportation.privateVehicle}
                  onChange={(e) => handleInputChange(index, 'transportation', { ...member.transportation, privateVehicle: e.target.value })}
                  placeholder="Private Vehicle"
                  className="mt-1 p-2 block w-full shadow-sm border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  value={member.transportation.publicVehicle}
                  onChange={(e) => handleInputChange(index, 'transportation', { ...member.transportation, publicVehicle: e.target.value })}
                  placeholder="Public Vehicle"
                  className="mt-1 p-2 block w-full shadow-sm border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  value={member.transportation.airTravel}
                  onChange={(e) => handleInputChange(index, 'transportation', { ...member.transportation, airTravel: e.target.value })}
                  placeholder="Air Travel"
                  className="mt-1 p-2 block w-full shadow-sm border border-gray-300 rounded-md"
                />
              </div>
              <label className="block text-sm font-medium text-gray-700">Food</label>
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={member.food.vegMeals}
                  onChange={(e) => handleInputChange(index, 'food', { ...member.food, vegMeals: e.target.value })}
                  placeholder="No. of Veg Meals"
                  className="mt-1 p-2 block w-full shadow-sm border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  value={member.food.nonVegMeals}
                  onChange={(e) => handleInputChange(index, 'food', { ...member.food, nonVegMeals: e.target.value })}
                  placeholder="No. of Non-Veg Meals"
                  className="mt-1 p-2 block w-full shadow-sm border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HouseholdForm;*/
