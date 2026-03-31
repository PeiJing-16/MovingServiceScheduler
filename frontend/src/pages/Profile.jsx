import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const Profile = () => {
  const { user } = useAuth(); // Access user token from context
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch profile data from the backend
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/api/auth/profile', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setFormData({
          name: response.data.name,
          email: response.data.email,
          address: response.data.address || '',
          phone: response.data.phone || '',
        });
      } catch (error) {
        alert('Failed to fetch profile. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchProfile();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstance.put('/api/auth/profile', formData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#D7EFFF] flex items-center justify-center p-6">
      <div className="relative w-full max-w-2xl rounded-xl bg-white/90 border border-[#c8e1fb] px-6 py-10 sm:px-10 overflow-hidden">
        <img
          src="/ProfileBg.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none select-none absolute left-1/2 top-1/2 w-auto -translate-x-1/2 -translate-y-1/2 opacity-30"
        />
        <div className="relative">
          <h1 className="text-3xl font-semibold text-center text-[#0d2440] mb-8 tracking-wide">
            User Profile
          </h1>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-xl bg-[#C1D8F0] drop-shadow-lg py-3 px-6 text-black"
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-xl bg-[#C1D8F0] drop-shadow-lg py-3 px-6 text-black"
            />
            <input
              type="text"
              placeholder="Address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full rounded-xl bg-[#C1D8F0] drop-shadow-lg py-3 px-6 text-black"
            />
            <input
              type="text"
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full rounded-xl bg-[#C1D8F0] drop-shadow-lg py-3 px-6 text-black"
            />
            <button
              type="submit"
              className="w-full rounded-xl bg-[#C1D8F0] text-black font-semibold py-3 hover:bg-[#93A9C0] transition focus:outline-none focus:ring-2 focus:ring-[#6aa7ff]"
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
