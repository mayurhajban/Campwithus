import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyEmail } from '../Service/LoginService';


export default function CheckEmail() {

    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await verifyEmail(email);
            if (data != null) {
                alert('Email verified successfully!');
                navigate('/change-password', { state: { email: data.email } });
            } else {
                alert('Email not found. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error verifying email.');
        }
    };

    const loginBgStyle = {
        background: "linear-gradient(rgba(221, 171, 171, 0.78), rgba(0, 0, 0, 0.6))",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
    };

    const cardStyle = {
        width: '24rem',
        background: 'rgba(255, 255, 255, 0.9)',
        padding: '1.5rem',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        borderRadius: '1rem',
        transition: 'transform 0.3s ease-in-out'
    };

    const buttonStyle = {
        backgroundColor: '#007bff',
        border: 'none'
    };

    return (
        <div>
            <div style={loginBgStyle}>
                <div className="card" style={cardStyle}>
                    <h2 className="text-center mb-4">Verify Your Email</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary w-100 mb-3" style={buttonStyle}>Verify Email</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
