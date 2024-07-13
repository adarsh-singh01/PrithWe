import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import leaf from '../assets/leaf.png';
import logo from '../assets/headerlogo.png';
import AdminDashBoardComp from '../components/AdminDashBoardComp';
import logo2 from '../assets/footerlogo.png'
import Visit from '../components/Visitor';
import sun from "../assets/sun.png";
import moon from "../assets/moon.png";

function AdminDashBoard() {
  const [theme, setTheme] = useState("light");
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.setItem('isAdminLoggedIn', 'false');
    navigate("/");
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.classList.toggle('dark-mode', newTheme === 'dark');
  };

  return (
    <div className={`flex-grow`}>
      <nav className={`border-gray-200 ${theme === 'light' ? 'bg-blue-500' : 'bg-gray-900'}`}>
        <div className="flex flex-wrap items-center justify-between p-2">
          <div className="logo flex space-x-2 items-center">
            <Link to="/"><img className="h-12" src={leaf} alt="Leaf Logo" /></Link>
            <Link to="/"><img className="h-7" src={logo} alt="Header Logo" /></Link>
          </div>
          <div className="btns justify-center items-center font-medium md:flex space-x-2">
            <button onClick={toggleTheme} className="theme-toggle-btn p-2 rounded-full">
              <img src={theme === "light" ? moon : sun} alt="Toggle Theme" className="w-10 h-10" />
            </button>
            <button onClick={handleLogout} className="btn bg-white px-3 py-2 font-Rubik rounded-full hover:bg-black hover:text-white">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <AdminDashBoardComp theme={theme} />

      <footer className={`shadow md:mt-48 ${theme === 'light' ? 'bg-gray-900' : 'bg-gray-800'}`}>
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <a href="#" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
              <img src={logo2} className="h-16" alt="Logo" />
            </a>
          </div>
          <hr className={`my-6 border-gray-200 sm:mx-auto ${theme === 'light' ? 'dark:border-gray-700' : 'dark:border-gray-600'} lg:my-8`} />
          <Visit />
          <span className={`block text-sm sm:text-center ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
            © 2024 <a href="#" className="hover:underline">PrithWe™</a>. All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}

export default AdminDashBoard;
