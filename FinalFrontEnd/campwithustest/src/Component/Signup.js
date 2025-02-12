import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { registerUser } from '../Service/LoginService';

export default function Signup() {

    const [formData, setFormData] = useState({
        name: '',
        bio: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'USER'
      });
    
      const navigate = useNavigate();
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
          alert('Passwords do not match!');
          return;
        }
        try {
          const data = await registerUser(formData);
          alert('Signup successful! Please login.');
          navigate('/');
        } catch (error) {
          console.error('Error:', error);
          alert('Error during signup.');
        }
      };
    
      const signupBgStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(rgba(221, 171, 171, 0.78), rgba(0, 0, 0, 0.6))',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      };
    
      const cardStyle = {
        padding: '20px',
        background: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '24rem'
      };
    
      const buttonStyle = {
        backgroundColor: '#007bff',
        border: 'none'
      };

  return (
    <div>
        <div style={signupBgStyle}>
      <div className="card" style={cardStyle}>
        <h2 className="text-center mb-4">Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="bio" className="form-label">Bio</label>
            <textarea
              name="bio"
              className="form-control"
              id="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="form-control"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="role" className="form-label">Role</label>
            <select
              name="role"
              className="form-select"
              id="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-100 mb-3" style={buttonStyle}>Sign Up</button>

          <div className="text-center mt-3">
            <span>Already have an account? </span>
            <NavLink to="/" className="text-primary fw-bold text-decoration-none">Login</NavLink>
          </div>
        </form>
      </div>
    </div>
    </div>
  )
}
