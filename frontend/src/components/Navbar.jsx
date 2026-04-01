import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-[#142C3E] text-white p-4 flex justify-between items-center">
      <Link to="/" className="flex items-center gap-2">
        <img src="/Logo.png" alt="Logo" className="h-12 w-15" />
        <span className="text-2xl font-bold">Moving Service Scheduler System</span>
      </Link>
      <div>
        {user ? (
          <>
            <Link to="/profile" className="mr-4 font-medium">
              Profile
            </Link>
            <Link to="/bookings/create" className="mr-4 font-medium">
              Get Quote
            </Link>
            <Link to="/bookings/view/user" className="mr-4 font-medium">
              View Bookings
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
