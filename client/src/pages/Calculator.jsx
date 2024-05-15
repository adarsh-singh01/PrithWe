import React, { useEffect } from 'react';
import HouseholdForm from '../components/HouseholdForm';
import BusinessForm from '../components/BusinessForm';
import { useState } from 'react';
import axios from 'axios';

function Calculator() {

  const [userType, setUserType] = useState('');

  useEffect(() => {
    // Fetch user type upon login
    const fetchUserType = async () => {
      try {
        const response = await axios.get('/api/auth/user-type', { withCredentials: true });
        console.log('User type response:', response.data.type);
        setUserType(response.data.type); // Set userType with response.data.type
      } catch (error) {
        console.error('Error fetching user type:', error);
      }
    };
  
    fetchUserType();
  }, []);

  /*useEffect(() => {
    // Fetch user type upon login
    const fetchUserType = async () => {
      try {
        const response = await axios.get('http://localhost:3001/user-type', { withCredentials: true });
        console.log('User type response:', response.data.type);
        setUserType(response.data.type); // Fix: Set userType with response.data.type
        console.log('User type:', userType);
      } catch (error) {
        console.error('Error fetching user type:', error);
      }
    };

    fetchUserType();
  }, []);

  console.log('User type:', userType); // Log the userType to check its value

  // Render the appropriate component based on the user type
  const renderForm = () => {
    switch (userType) {
      case 'business':
        return <BusinessForm />;
      case 'household':
        return <HouseholdForm />;
      default:
        return null;
    }
  }; */

  return (
    <div className='flex-grow'>
    {userType === 'Business' ? <BusinessForm /> : <HouseholdForm />}
  </div>
  );
};

export default Calculator;

/*import React, { useEffect } from 'react';
import HouseholdForm from '../components/HouseholdForm';
import BusinessForm from '../components/BusinessForm';
import { useState } from 'react';
import axios from 'axios';

function Calculator() {

  const [userType, setUserType] = useState('');

  useEffect(() => {
    // Fetch user type upon login
    const fetchUserType = async () => {
      try {
        const response = await axios.get('http://localhost:3001/user-type', { withCredentials: true });
        console.log('User type response:', response.data.type);
        setUserType(response.data.type); // Fix: Set userType with response.data.type
      } catch (error) {
        console.error('Error fetching user type:', error);
      }
    };

    fetchUserType();
  }, []);

  console.log('User type:', userType); // Log the userType to check its value

  return (
    <div>
      {userType === 'business' ? <BusinessForm /> : userType === 'household' ? <HouseholdForm /> : null}
    </div>
  );
};

export default Calculator;*/
