import React, { useEffect, useState } from 'react';
import API from '../services/api';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    bio: '',
    profile_picture: null,
    password: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await API.get('profile/');
        setProfile(response.data);
        setFormData({
          bio: response.data.bio || '',
          profile_picture: null,
          password: '',
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to load profile. Please try again.');
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profile_picture: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const data = new FormData();
    data.append('bio', formData.bio);
    if (formData.profile_picture) {
      data.append('profile_picture', formData.profile_picture);
    }
    if (formData.password) {
      data.append('password', formData.password);
    }

    try {
      const response = await API.put('profile/', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setProfile(response.data);
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    }
  };

  if (loading) {
    return <div className="text-center mt-10 text-gray-500">Loading profile...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Your Profile</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
          {/* Profile Picture */}
          <div className="flex flex-col items-center">
            <img
              src={profile.profile_picture || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="h-32 w-32 rounded-full object-cover mb-4 border"
            />
            <label
              htmlFor="profile_picture"
              className="text-blue-500 cursor-pointer hover:underline"
            >
              Change Profile Picture
            </label>
            <input
              id="profile_picture"
              type="file"
              name="profile_picture"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Username and Email */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium">Username</label>
              <p className="text-gray-900 bg-gray-100 rounded-md p-2">{profile.username}</p>
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <p className="text-gray-900 bg-gray-100 rounded-md p-2">{profile.email}</p>
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-gray-700 font-medium">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              rows="4"
              placeholder="Write something about yourself..."
            ></textarea>
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium">New Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter a new password (optional)"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
