import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AdminSideChart from './AdminSideChart';

function UserDetailsSection() {
  const { userId } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const [entries, setEntries] = useState([]);
  const [expandedEntry, setExpandedEntry] = useState(null);
  const [expandedMember, setExpandedMember] = useState(null);
  const [Recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`/api/admin/user/${userId}`);
        setUserDetails(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    const fetchEntries = async () => {
      try {
        const response = await axios.get("api/household/entries", {
          headers: { "user-id": userId },
        });
        const entriesData = response.data;

        const entriesWithFamily = await Promise.all(
          entriesData.map(async (entry) => {
            const familyResponse = await axios.get(`/api/household/familyEntries/${entry.id}`);
            return { ...entry, familyEntries: familyResponse.data };
          })
        );

        // Sort entries by date in descending order (most recent at the top)
        entriesWithFamily.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        setEntries(entriesWithFamily);
      } catch (error) {
        console.error('Error fetching entries:', error);
      }
    };

    const fetchRecommendations = async () => {
      try {
        const response = await axios.get("api/household/recommendations", {
          headers: { "user-id": userId },
        });
        const recommendations = response.data;
        console.log("recommendations")
        console.log(recommendations)
        setRecommendations(recommendations);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };

    fetchUserDetails();
    fetchEntries();
    fetchRecommendations();
  }, [userId]);

  if (!userDetails) {
    return <div className="flex justify-center items-center h-screen"><p className="text-lg">Loading...</p></div>;
  }

  function formatRecommendations(data) {
    return data
      .replace(/## (.*?):/g, '<h2>$1</h2>')
      .replace(/### (.*?):/g, '<h3>$1</h3>')
      .replace(/#### (.*?):/g, '<h4>$1</h4>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\- (.*?):/g, '<li>$1</li>')
      .replace(/\n/g, '<br />'); // Add line breaks for better readability
  }

  const { user, household, business, familyMembers } = userDetails;
  const isHouseholdUser = user.type === 'Household';
  const isBusinessUser = user.type === 'Business';

  const toggleEntry = (index) => {
    setExpandedEntry(expandedEntry === index ? null : index);
  };

  const toggleMember = (index) => {
    setExpandedMember(expandedMember === index ? null : index);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const formattedDate = date.toLocaleString();
    return formattedDate;
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 space-y-6 mb-28 ">
      <div className="flex justify-center items-center">
        <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center ">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Household's Details</h2>
          <p className="text-gray-600"><strong>Email:</strong> household@gmail.com</p>
          <p className="text-gray-600"><strong>Type:</strong> Household</p>
          <p className="text-gray-600"><strong>Verified:</strong> Yes</p>
        </div>
      </div>
      {isHouseholdUser && (
        <div className='flex flex-col gap-10'>
          {entries.length > 0 ? (
            entries.map((entry, entryIndex) => (
              <div key={entryIndex} className="bg-gray-50 p-4 rounded-lg shadow-md space-y-4">
                <div
                  className='mx-auto flex flex-row items-center cursor-pointer w-full justify-between'
                  onClick={() => toggleEntry(entryIndex)}
                >
                  <p className="text-gray-600 flex items-center ">
                    <span className="ml-2">Sr No. <strong>{entries.length - entryIndex}</strong></span>
                  </p>
                  <div className='flex gap-6'>
                    <p className="text-gray-600">Date. <strong>{formatDate(entry.created_at)}</strong></p>
                    <span className='mr-4'>{expandedEntry === entryIndex ? '▲' : '▼'}</span>
                  </div>
                </div>
                {expandedEntry === entryIndex && (
                  <div className="mt-4">
                    <p className="text-gray-600"><strong>Electricity Usage:</strong> {entry.electricity_usage}</p>
                    <p className="text-gray-600"><strong>Water Usage:</strong> {entry.water_usage}</p>
                    <p className="text-gray-600"><strong>Waste Generation:</strong> {entry.waste_generation}</p>
                    <p className="text-gray-600"><strong>Gas Cylinder:</strong> {entry.gas_cylinder}</p>
                    <div className="flex justify-center items-center text-center m-2 ">
                      <h3 className="text-2xl font-semibold text-gray-800 m-2 rounded-lg shadow-md bg-gray-200 px-4 py-2">Family Members</h3>
                    </div>
                    {entry.familyEntries.length > 0 ? (
                      <ul className="space-y-4">
                        {entry.familyEntries.map((member, memberIndex) => (
                          <li key={memberIndex} className="text-left bg-gray-50 p-4 rounded-lg shadow-md">
                            <div onClick={() => toggleMember(`${entryIndex}-${memberIndex}`)} className="cursor-pointer flex justify-between">
                              <p className="text-gray-600"><strong>Name:</strong> {member.name}</p>
                              <span>{expandedMember === `${entryIndex}-${memberIndex}` ? '▲' : '▼'}</span>
                            </div>
                            {expandedMember === `${entryIndex}-${memberIndex}` && (
                              <div className="mt-4">
                                <p className="text-gray-600"><strong>Private Vehicle:</strong> {member.private_vehicle}</p>
                                <p className="text-gray-600"><strong>Public Vehicle:</strong> {member.public_vehicle}</p>
                                <p className="text-gray-600"><strong>Air Travel:</strong> {member.air_travel}</p>
                                <p className="text-gray-600"><strong>Veg Meals:</strong> {member.veg_meals}</p>
                                <p className="text-gray-600"><strong>Non-Veg Meals:</strong> {member.non_veg_meals}</p>
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-600">No family members data available.</p>
                    )}
                    <div className="flex justify-center items-center text-center m-2 ">
                      <h3 className="text-2xl font-semibold text-gray-800 m-5 rounded-lg shadow-md bg-gray-200 px-4 py-2">Total Carbon Footprints</h3>
                    </div>


                    <AdminSideChart entry={entry} />
                    <div className="flex justify-center items-center text-center m-2 ">
                      <h3 className="text-2xl font-semibold text-gray-800 m-5 rounded-lg shadow-md bg-gray-200 px-4 py-2">Recommendations</h3>
                    </div>


                    {Recommendations.map((item, index) => (
                      item.household_common_id === entry.id && (
                        <div
                          key={index}
                          className="p-4 bg-blue-50 rounded-lg shadow-md"
                          dangerouslySetInnerHTML={{ __html: formatRecommendations(item.recommendation) }}
                        />
                      )
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-600">No household data available.</p>
          )}
        </div>
      )}

      {isBusinessUser && (
        <div>
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
