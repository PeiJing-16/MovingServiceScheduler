import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Auth from './pages/Auth';
import AdminLogin from './pages/AdminLogin';
import Profile from './pages/Profile';
import Tasks from './pages/Tasks';
import CreateBooking from './pages/CreateBooking';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/bookings/create" element={<CreateBooking />} />
      </Routes>
    </Router>
  );
}

export default App;
