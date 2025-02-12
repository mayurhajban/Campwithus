import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { updatePassword } from '../Service/LoginService'

export default function ChangePassword() {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const location = useLocation();
    const emailFromState = location.state?.email || '';

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedFormData = {
                email: emailFromState,  // Ensure email is sent
                password: formData.password
            };
            const data = await updatePassword(updatedFormData);
            if (data != null) {
                alert('Password updated successfully! Please login.');
                navigate('/');
            } else {
                alert('Password updation failed.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error updating password.');
        }
    };
    

    const updateBgStyle = {
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

            <div style={updateBgStyle}>
                <div className="card" style={cardStyle}>
                    <h2 className="text-center mb-4">Update Password</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                id="email"
                                value={emailFromState}
                                readOnly
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">New Password</label>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter new password"
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary w-100 mb-3" style={buttonStyle}>Update Password</button>
                    </form>
                </div>
            </div>

        </div>
    )
}
