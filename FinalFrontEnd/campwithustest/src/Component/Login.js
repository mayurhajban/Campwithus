import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { login } from '../Service/LoginService';
import { jwtDecode } from 'jwt-decode';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [captcha, setCaptcha] = useState('');
  const [userCaptcha, setUserCaptcha] = useState('');
  const [captchaError, setCaptchaError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const randomNum = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit random number
    setCaptcha(randomNum.toString());
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCaptchaChange = (e) => {
    setUserCaptcha(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userCaptcha !== captcha) {
      setCaptchaError('Invalid CAPTCHA. Try again.');
      generateCaptcha(); // Reset CAPTCHA
      return;
    }

    try {
      const data = await login(formData);
      if (data.jwt) {
        localStorage.setItem('token', data.jwt);
        localStorage.setItem('userId', data.userId);

        const decodedToken = jwtDecode(data.jwt);
        const role = decodedToken.authorities;

        if (role === 'ROLE_ADMIN') {
          navigate('/AdminHome');
        } else if (role === 'ROLE_USER') {
          navigate('/home');
        } else {
          alert('Invalid role.');
        }
      } else {
        alert('Invalid response from server.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: "linear-gradient(rgba(221, 171, 171, 0.78), rgba(0, 0, 0, 0.6))" }}>
      <div className="card p-4 shadow-lg rounded">
        <h2 className="text-center mb-4">Welcome Back!</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" name="email" className="form-control" id="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" name="password" className="form-control" id="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" required />
          </div>
          <div className="mb-3 d-flex align-items-center">
            <span className="captcha-text bg-light p-2 border rounded me-2">{captcha}</span>
            <input type="text" className="form-control" style={{ maxWidth: '150px' }} value={userCaptcha} onChange={handleCaptchaChange} placeholder="Enter CAPTCHA" required />
          </div>
          {captchaError && <div className="text-danger mt-1 text-center">{captchaError}</div>}
          <button type="submit" className="btn btn-primary w-100 mb-3">Login</button>
          <div className="text-center">
            <NavLink to="/forgot-password" className="text-decoration-none">Forgot Password?</NavLink>
          </div>
          <div className="text-center mt-3">
            <span>Don't have an account? </span>
            <NavLink to="/signup" className="text-primary fw-bold text-decoration-none">Sign Up</NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}
