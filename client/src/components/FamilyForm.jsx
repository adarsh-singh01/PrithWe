import React, { useState } from 'react';

function FamilyForm() {
  const [numFamilyMembers, setNumFamilyMembers] = useState(0);
  const [familyData, setFamilyData] = useState([]);

  const handleInputChange = (index, key, value) => {
    const updatedFamilyData = [...familyData];
    updatedFamilyData[index][key] = value;
    setFamilyData(updatedFamilyData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const initialFamilyData = Array.from({ length: numFamilyMembers }, () => ({
      name: '',
      transportation: { privateVehicle: '', publicVehicle: '', airTravel: '' },
      food: { vegMeals: '', nonVegMeals: '' },
    }));
    setFamilyData(initialFamilyData);
  };

  return (
    <div className="container mx-auto mt-10 mb-10">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <label htmlFor="numFamilyMembers" className="mb-4">How many members are in your family?</label>
        <input
          type="number"
          id="numFamilyMembers"
          value={numFamilyMembers}
          onChange={(e) => setNumFamilyMembers(parseInt(e.target.value))}
          className="border border-gray-300 rounded-md px-2 py-1 mb-4"
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Next</button>
      </form>

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

export default FamilyForm;



/*import React, { useState } from 'react';

function MemberCard() {
  const [numFamilyMembers, setNumFamilyMembers] = useState(0);
  const [familyData, setFamilyData] = useState([]);

  const handleInputChange = (index, key, value) => {
    const updatedFamilyData = [...familyData];
    updatedFamilyData[index][key] = value;
    setFamilyData(updatedFamilyData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const initialFamilyData = Array.from({ length: numFamilyMembers }, () => ({ name: '', transportation: '', food: '' }));
    setFamilyData(initialFamilyData);
  };

  return (
    <div className="container mx-auto mt-10">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <label htmlFor="numFamilyMembers" className="mb-4">How many members are in your family?</label>
        <input
          type="number"
          id="numFamilyMembers"
          value={numFamilyMembers}
          onChange={(e) => setNumFamilyMembers(parseInt(e.target.value))}
          className="border border-gray-300 rounded-md px-2 py-1 mb-4"
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
      </form>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {familyData.map((member, index) => (
          <div key={index} className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Member {index + 1}</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                value={member.name}
                onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                placeholder="Enter Name"
                className="mt-1 p-2 block w-full shadow-sm border border-gray-300 rounded-md"
              />
              <label className="block text-sm font-medium text-gray-700">
                Transportation
              </label>
              <input
                type="text"
                value={member.transportation}
                onChange={(e) => handleInputChange(index, 'transportation', e.target.value)}
                placeholder="Enter Transportation"
                className="mt-1 p-2 block w-full shadow-sm border border-gray-300 rounded-md"
              />
              <label className="block text-sm font-medium text-gray-700">
                Food
              </label>
              <input
                type="text"
                value={member.food}
                onChange={(e) => handleInputChange(index, 'food', e.target.value)}
                placeholder="Enter Food"
                className="mt-1 p-2 block w-full shadow-sm border border-gray-300 rounded-md"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MemberCard;*/
