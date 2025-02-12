import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById, updateUserProfile } from '../Service/UserService';
import MyHeader from './MyHeader';
import MyFooter from './MyFooter';

export default function Profile() {
  const { userId: paramUserId } = useParams();
  const storedUserId = localStorage.getItem('userId');
  const userId = paramUserId || storedUserId || '1';
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    bio: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getUserById(userId);
        setFormData({
          id: profile.data.id || '',
          name: profile.data.name || '',
          bio: profile.data.bio || '',
          email: profile.data.email || '',
          password: '', // Do not autofill passwords
          confirmPassword: '',
        });
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const updatedProfile = { ...formData };
      if (!formData.password) {
        delete updatedProfile.password; // Remove empty password fields
        delete updatedProfile.confirmPassword;
      }

      await updateUserProfile(userId, updatedProfile);
      alert('Profile updated successfully!');
      navigate('/home');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Profile update failed.');
    }
  };

  if (isLoading) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div>
      <MyHeader />
      <div className="container mt-5 d-flex justify-content-center">
        <div
          className="card p-4 shadow-lg"
          style={{
            maxWidth: '600px',
            width: '100%',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #f3f4f6, #e2e8f0)',
            border: '1px solid #d1d5db',
          }}
        >
          <h4 className="text-center mb-3" style={{ fontStyle: 'italic', color: '#4b5563', fontWeight: '500' }}>
            "Update your profile and keep your journey going!"
          </h4>

          <h2 className="text-center mb-4" style={{ color: '#374151' }}>
            Edit Profile
          </h2>

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label htmlFor="bio" className="form-label">
                Bio
              </label>
              <textarea className="form-control" id="bio" rows="3" name="bio" value={formData.bio} onChange={handleChange}></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                New Password
              </label>
              <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} />
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
            </div>

            <button type="submit" className="btn btn-primary w-100" style={{ borderRadius: '8px' }}>
              Update Profile
            </button>
          </form>
        </div>
      </div>
      <MyFooter />
    </div>
  );
}
