import React, { useState, useEffect } from "react";
import axios from "axios";
import HistoryComponent from "./HistoryCompoForHouse";

const CarbonFootprintHistory = () => {
  const [entries, setEntries] = useState([]);

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

        setEntries(entriesWithFamily);
      } catch (error) {
        console.error("Error fetching data:", error);
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

    fetchEntries();
  }, []);

  return (
    <div className="container m-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Carbon Footprint History</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Electricity Usage
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Water Usage
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Waste Generation
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gas Cylinder
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Preview
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {entries.map((entry) => (
              <HistoryComponent entry={entry} key={entry.id} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CarbonFootprintHistory;
