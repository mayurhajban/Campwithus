import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addTrip } from '../Service/TripService';
import MyHeader from './MyHeader';
import Myfooter from './MyFooter';


const AddTripForm = () => {
    const navigate = useNavigate();
    const [category, setCategory] = useState("");

    // State to hold form data
    const [trip, setTrip] = useState({
        locationName: '',
        tripDescription: '',
        startDate: '',
        endDate: '',
        budget: '',
        noOfCompanion: '',
        categoryId: '',
        userId: ''
    });

    const categories = [
        { label: "Adventure", value: 1 },
        { label: "Wellness", value: 2 },
        { label: "Historical", value: 3 },
        { label: "Cultural", value: 4 },
        { label: "Cruise", value: 5 }
    ];

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTrip({ ...trip, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting trip data: " , trip)
        try {
            // Call the service function to add the trip
            const response = await addTrip(trip);
            console.log('Trip added successfully:', response.data);
            alert("Trip created Successfully");
            navigate('/trips');
        } catch (error) {
            console.error('Error adding trip:', error);
        }
    };

    const uId = localStorage.getItem("userId")

    return (
        <div>
            <MyHeader></MyHeader>
            <div className="container mt-5 d-flex justify-content-center">
                <div className="card p-4 shadow-lg"
                    style={{
                        maxWidth: "600px",
                        width: "100%",
                        borderRadius: "12px",
                        background: "linear-gradient(135deg, #f3f4f6, #e2e8f0)", // Light gradient background
                        border: "1px solid #d1d5db"
                    }}>

                    {/* Quote Section */}
                    <h4 className="text-center mb-3"
                        style={{
                            fontStyle: "italic",
                            color: "#4b5563",
                            fontWeight: "500"
                        }}>
                        "Life is short and the world is wide. Let's explore!"
                    </h4>

                    <h2 className="text-center mb-4" style={{ color: "#374151" }}>Add New Trip</h2>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label htmlFor="locationName" className="form-label">Location Name</label>
                            <input type="text" className="form-control" id="locationName"
                                name="locationName" value={trip.locationName} onChange={handleInputChange} required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="tripDescription" className="form-label">Trip Description</label>
                            <textarea className="form-control" id="tripDescription"
                                name="tripDescription" value={trip.tripDescription} onChange={handleInputChange} required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="startDate" className="form-label">Start Date</label>
                            <input type="date" className="form-control" id="startDate"
                                name="startDate" value={trip.startDate} onChange={handleInputChange} required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="endDate" className="form-label">End Date</label>
                            <input type="date" className="form-control" id="endDate"
                                name="endDate" value={trip.endDate} onChange={handleInputChange} required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="budget" className="form-label">Budget</label>
                            <input type="number" className="form-control" id="budget"
                                name="budget" value={trip.budget} onChange={handleInputChange} required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="noOfCompanion" className="form-label">Number of Companions</label>
                            <input type="number" className="form-control" id="noOfCompanion"
                                name="noOfCompanion" value={trip.noOfCompanion} onChange={handleInputChange} required />
                        </div>

                        {/* Category Dropdown */}
                        <div className="mb-3">
                            <label htmlFor="category" className="form-label">Category</label>
                            <select className="form-select" id="category"
                                value={category} onChange={(e) => {
                                    setCategory(e.target.value);
                                    handleInputChange({ target: { name: "categoryId", value: e.target.value } });
                                }} required>
                                <option value="">Select Category</option>
                                {categories.map(cat => (
                                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <input type="text" className="form-control" id="userId"
                                name="userId" value={uId} hidden required />
                        </div>

                        <button type="submit" className="btn btn-primary w-100" style={{ borderRadius: "8px" }}>
                            Add Trip
                        </button>
                    </form>
                </div>
            </div>
            <Myfooter></Myfooter>
        </div>
    );
};

export default AddTripForm;