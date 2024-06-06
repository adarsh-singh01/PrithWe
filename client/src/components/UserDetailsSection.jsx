import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function UserDetailsSection() {
  const { userId } = useParams();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    axios.get(`/api/admin/user/${userId}`)
      .then(response => {
        setUserDetails(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching user:', error);
      });
  }, [userId]);

  if (!userDetails) {
    return <div className="flex justify-center items-center h-screen"><p className="text-lg">Loading...</p></div>;
  }

  const { user, household, business, familyMembers } = userDetails;
  const isHouseholdUser = user.type === 'Household';
  const isBusinessUser = user.type === 'Business';

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="bg-white shadow-lg rounded-lg p-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{user.name}'s Details</h2>
        <p className="text-gray-600"><strong>Email:</strong> {user.email}</p>
        <p className="text-gray-600"><strong>Type:</strong> {user.type}</p>
        <p className="text-gray-600"><strong>Verified:</strong> {user.isverified ? 'Yes' : 'No'}</p>
      </div>

      {isHouseholdUser && (
        <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Household Common</h3>
            {household.length > 0 ? (
              <ul className="space-y-4">
                {household.map((item, index) => (
                  <li key={index} className="text-left bg-gray-50 p-4 rounded-lg shadow-md">
                    <p className="text-gray-600"><strong>Electricity Usage:</strong> {item.electricity_usage}</p>
                    <p className="text-gray-600"><strong>Water Usage:</strong> {item.water_usage}</p>
                    <p className="text-gray-600"><strong>Waste Generation:</strong> {item.waste_generation}</p>
                    <p className="text-gray-600"><strong>Gas Cylinder:</strong> {item.gas_cylinder}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No household data available.</p>
            )}
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Family Members</h3>
            {familyMembers.length > 0 ? (
              <ul className="space-y-4">
                {familyMembers.map((member, index) => (
                  <li key={index} className="text-left bg-gray-50 p-4 rounded-lg shadow-md">
                    <p className="text-gray-600"><strong>Name:</strong> {member.name}</p>
                    <p className="text-gray-600"><strong>Private Vehicle:</strong> {member.private_vehicle}</p>
                    <p className="text-gray-600"><strong>Public Vehicle:</strong> {member.public_vehicle}</p>
                    <p className="text-gray-600"><strong>Air Travel:</strong> {member.air_travel}</p>
                    <p className="text-gray-600"><strong>Veg Meals:</strong> {member.veg_meals}</p>
                    <p className="text-gray-600"><strong>Non-Veg Meals:</strong> {member.non_veg_meals}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No family members data available.</p>
            )}
          </div>
        </div>
      )}

      {isBusinessUser && (
        <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Business Common</h3>
          {business.length > 0 ? (
            <ul className="space-y-4">
              {business.map((item, index) => (
                <li key={index} className="text-left bg-gray-50 p-4 rounded-lg shadow-md">
                  <p className="text-gray-600"><strong>Electricity Usage:</strong> {item.electricity_usage}</p>
                  <p className="text-gray-600"><strong>Water Usage:</strong> {item.water_usage}</p>
                  <p className="text-gray-600"><strong>Paper Consumption:</strong> {item.paper_consumption}</p>
                  <p className="text-gray-600"><strong>Waste Generation:</strong> {item.waste_generation}</p>
                  <p className="text-gray-600"><strong>Fuel Consumption:</strong> {item.fuel_consumption}</p>
                  <p className="text-gray-600"><strong>Business Travel:</strong> {item.business_travel}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No business data available.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default UserDetailsSection;
