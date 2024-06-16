import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSideChart from "./AdminSideChart";
import { calculateTotalCarbonFootprint } from "./CarbonCalculator";

const CarbonFootprintHistory = () => {
  const [entries, setEntries] = useState([]);
  const [expandedEntry, setExpandedEntry] = useState(null);
  const [expandedMember, setExpandedMember] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [carbonFootprints, setCarbonFootprints] = useState({});

  useEffect(() => {
    const fetchEntries = async () => {
      const id = await fetchUserId();
      try {
        const response = await axios.get("api/household/entries", {
          headers: { "user-id": id },
        });
        const entriesData = response.data;

        // Fetch family data for each entry
        const entriesWithFamily = await Promise.all(
          entriesData.map(async (entry) => {
            const familyResponse = await axios.get(
              `/api/household/familyEntries/${entry.id}`
            );
            return { ...entry, familyEntries: familyResponse.data };
          })
        );

        entriesWithFamily.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        const carbonFootprintMap = {};
        entriesWithFamily.forEach(entry => {
          const { formData, familyData } = getLastEntryFormData(entry);
          carbonFootprintMap[entry.id] = calculateTotalCarbonFootprint(formData, familyData);
        });

        setEntries(entriesWithFamily);
        setCarbonFootprints(carbonFootprintMap);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchUserId = async () => {
      try {
        const response = await axios.get("/api/auth/login/status", {
          withCredentials: true,
        });
        return response.data.id;
      } catch (error) {
        console.error("Error fetching user ID:", error);
        throw error;
      }
    };

    const fetchRecommendations = async () => {
      const id = await fetchUserId();
      try {
        const response = await axios.get("api/household/recommendations", {
          headers: { "user-id": id },
        });
        setRecommendations(response.data);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };

    fetchEntries();
    fetchRecommendations();
  }, []);

  const getLastEntryFormData = (entry) => {
    return {
      formData: {
        electricityUsage: entry.electricity_usage,
        waterUsage: entry.water_usage,
        wasteGeneration: entry.waste_generation,
        gasCylinder: entry.gas_cylinder,
      },
      familyData: entry.familyEntries.map((ent) => ({
        name: ent.name,
        transportation: {
          privateVehicle: ent.private_vehicle,
          publicVehicle: ent.public_vehicle,
          airTravel: ent.air_travel,
        },
        food: { vegMeals: ent.veg_meals, nonVegMeals: ent.non_veg_meals },
      }))
    };
  };

  const toggleEntry = (index) => {
    setExpandedEntry(expandedEntry === index ? null : index);
  };

  const toggleMember = (index) => {
    setExpandedMember(expandedMember === index ? null : index);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString();
  };

  const formatRecommendations = (data) => {
    return data
      .replace(/## (.*?):/g, '<h2>$1</h2>')
      .replace(/### (.*?):/g, '<h3>$1</h3>')
      .replace(/#### (.*?):/g, '<h4>$1</h4>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\- (.*?):/g, '<li>$1</li>')
      .replace(/\n/g, '<br />');
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 space-y-6 mb-28">
      <h1 className="text-2xl font-bold mb-4 text-center">Carbon Footprint History</h1>
      <div className='flex flex-col gap-10'>
        {entries.length > 0 ? (
          entries.map((entry, entryIndex) => (
            <div key={entryIndex} className="bg-gray-50 p-4 rounded-lg shadow-md space-y-4">
              <div
                className='mx-auto flex flex-row items-center cursor-pointer w-full justify-between'
                onClick={() => toggleEntry(entryIndex)}
              >
                <p className="text-gray-600 flex items-center">
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
                  <div className="flex justify-center items-center text-center m-2">
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
                  <div className="flex justify-center items-center text-center m-2">
                    <h3 className="text-2xl font-semibold text-gray-800 m-5 rounded-lg shadow-md bg-gray-200 px-4 py-2">
                      Total Carbon Footprints: {Math.round(carbonFootprints[entry.id] * 100) / 100} KgCO<sub>2</sub>
                    </h3>
                  </div>
                  <AdminSideChart entry={entry} />
                  <div className="flex justify-center items-center text-center m-2">
                    <h3 className="text-2xl font-semibold text-gray-800 m-5 rounded-lg shadow-md bg-gray-200 px-4 py-2">Recommendations</h3>
                  </div>
                  {recommendations.filter(item => item.household_common_id === entry.id).map((item, index) => (
                    <div
                      key={index}
                      className="p-4 bg-blue-50 rounded-lg shadow-md"
                      dangerouslySetInnerHTML={{ __html: formatRecommendations(item.recommendation) }}
                    />
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-600">No household data available.</p>
        )}
      </div>
    </div>
  );
};

export default CarbonFootprintHistory;
