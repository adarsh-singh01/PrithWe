import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UsersList = ({ setSelectedUser }) => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/admin/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleUserClick = (userId) => {
    setSelectedUser(userId);
    navigate(`/admin/user/${userId}`);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users && users.map(user => (
          <div
            key={user.id}
            className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg"
            onClick={() => handleUserClick(user.id)}
          >
            <h3 className="text-xl font-semibold">{user.name}</h3>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-600">Type: {user.type}</p>
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
