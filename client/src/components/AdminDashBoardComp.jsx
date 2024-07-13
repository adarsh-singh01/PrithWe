import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UsersList from './UserList';
import ContactDetails from './ContactDetails';

function AdminDashBoardComp( props ) {
  const [view, setView] = useState('users');
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('isAdminLoggedIn') !== "true") {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="container mx-auto p-4">
      <h1 className={`text-4xl font-bold mb-4 ${props.theme === 'dark' ? 'text-white' : ''}`}>Prithwe Admin Dashboard</h1>
      <div className="flex mb-4">
        <button
          className={`px-4 py-2 mr-10 rounded ${view === 'users' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => setView('users')}
        >
          All Users
        </button>
        <button
          className={`px-4 py-2 rounded ${view === 'contacts' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => setView('contacts')}
        >
          Contact Us Details
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {view === 'users' && <UsersList setSelectedUser={setSelectedUser} props={props} />}
        {view === 'contacts' && <ContactDetails />}
      </div>
    </div>
  );
}

export default AdminDashBoardComp;
