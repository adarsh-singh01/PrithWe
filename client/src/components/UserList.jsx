import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from "axios";


const UsersList = ({ setSelectedUser }) => {
    const [Users,setUsers]=useState();

    useEffect(() => {
        axios.get('/api/admin/users')
          .then(response => {
            console.log(response.data)
            setUsers(response.data);
          })
          .catch(error => {
            console.error('Error fetching contacts:', error);
          });
      }, []);
    
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Users && Users.map(user => (
          <div
            key={user.id}
            className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg"
            onClick={() => setSelectedUser(user.id)}
          >
            <h3 className="text-xl font-semibold">{user.name}</h3>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-600">type:{user.type}</p>
            <p className="text-sm">
              {user.isverified ? (
                <span className="text-green-500">Verified</span>
              ) : (
                <span className="text-red-500">Not Verified</span>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
