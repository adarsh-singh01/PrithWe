import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import leaf from '../assets/leaf.png';
import logo from '../assets/headerlogo.png';
import AdminDashBoardComp from '../components/AdminDashBoardComp';

function AdminDashBoard() {
    const navigate = useNavigate();
  const handleLogout = async () => {
    localStorage.setItem('isAdminLoggedIn','false')
    navigate("/")
  };    

  return (
    <div className="flex-grow">
      <nav className="border-gray-200 bg-blue-500">
        <div className="flex flex-wrap items-center justify-between p-2">
          <div className="logo flex space-x-2 items-center">
            <Link to="/"><img className="h-12" src={leaf} alt="Leaf Logo" /></Link>
            <Link to="/"><img className="h-7" src={logo} alt="Header Logo" /></Link>
          </div>
          <div className="btns hidden font-medium md:flex space-x-2">
            <button onClick={handleLogout} className="btn bg-white px-3 py-2 font-Rubik rounded-full hover:bg-black hover:text-white">
              Logout
            </button>
          </div>
        </div>
      </nav>
      <AdminDashBoardComp />
    </div>
  );
}

export default AdminDashBoard;
