import React from 'react';
import { useState,useEffect } from 'react';
import axios from "axios";


const ContactDetails = () => {

    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        axios.get('/api/admin/contacts')
          .then(response => {
            setContacts(response.data);
          })
          .catch(error => {
            console.error('Error fetching contacts:', error);
          });
      }, []);
  
    
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Contact Us Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contacts && contacts.map(contact => (
          <div key={contact.id} className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-xl font-semibold">{contact.name}</h3>
            <p className="text-gray-600">{contact.email}</p>
            <p className="text-sm">{contact.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactDetails;
