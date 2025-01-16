import React, { useEffect, useState } from 'react';
import API from '../services/api';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await API.get('user-profile/');
        setProfile(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-gray-500">Loading profile...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Profile</h1>
        <div className="space-y-4">
          <p>
            <strong className="text-gray-700">Username:</strong> {profile.user.username}
          </p>
          <p>
            <strong className="text-gray-700">Email:</strong> {profile.user.email}
          </p>
          <p>
            <strong className="text-gray-700">Bio:</strong> {profile.bio || 'No bio provided'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
