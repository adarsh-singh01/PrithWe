import React, { useState } from 'react';

function CommonForm() {
  const [formData, setFormData] = useState({
    electricityUsage: '',
    waterUsage: '',
    wasteGeneration: '',
    gasCylinder: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  /*const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted with data:', formData);
  };*/

  return (
    <div className="container mx-auto mt-10">
      <form  className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-lg"> {/*onSubmit={handleSubmit}*/}
        <h2 className="text-2xl font-bold mb-4">Calculate Your Carbon Footprint</h2>
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
        {/*<button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>*/}
      </form>
    </div>
  );
}

export default CommonForm;
