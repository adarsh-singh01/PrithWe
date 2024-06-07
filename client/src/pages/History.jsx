import { useEffect } from "react";
import HistoryForHousehold from "../components/HistoryForHousehold";
import HistoryForBusiness from "../components/HistoryForBusiness";
import { useState } from "react";
import axios from "axios";

function History() {
  const [userType, setUserType] = useState("");

  useEffect(() => {
    // Fetch user type upon login
    const fetchUserType = async () => {
      try {
        const response = await axios.get("/api/auth/user-type", {
          withCredentials: true,
        });
        console.log("User type response:", response.data.type);
        setUserType(response.data.type); // Set userType with response.data.type
      } catch (error) {
        console.error("Error fetching user type:", error);
      }
    };

    fetchUserType();
  }, []);

  
  return (
    <div className="flex-grow">
      {userType === "Business" ? <HistoryForBusiness /> : <HistoryForHousehold />}
    </div>
  );
}

export default History;

