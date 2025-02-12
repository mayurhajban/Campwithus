import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import MyHeader from './MyHeader';
import { searchByCategory } from '../Service/TripService';
import Myfooter from './MyFooter';

const TripsByCategoryComponent = () => {
    const [trips, setTrips] = useState([]);
    const [message, setMessage] = useState('');
    const { categoryId } = useParams();

    useEffect(() => {
        fetchTripsByCategory();
    }, [categoryId]);

    const fetchTripsByCategory = () => {
        searchByCategory(categoryId).then((response) => {
            setTrips(response.data);
            if (response.data.length === 0) {
                setMessage("No trips available for this category.");
            } else {
                setMessage('');
            }
        }).catch((error) => {
            console.error(error);
            setMessage("Failed to fetch trips.");
        });
    };

    return (
        <>
            <MyHeader></MyHeader>

            {message && <p style={{ color: "red", fontSize: "18px", textAlign: "center", marginTop: "20px" }}>{message}</p>}

            <div style={{ display: "flex", flexWrap: "wrap", gap: "50px", justifyContent: "center" }}>
                {trips.map(trip => (
                    <div className="card shadow-sm" style={{ width: "20rem", borderRadius: "12px", overflow: "hidden" }}>

                        {/* Image with Center Alignment */}
                        <div style={{ textAlign: "center", paddingTop: "15px" }}>
                            <img src="/images/insta_1.jpg" className="card-img-top"
                                style={{
                                    width: "90%",
                                    height: "180px",
                                    objectFit: "cover",
                                    borderRadius: "12px"
                                }}
                                alt="Trip"
                            />
                        </div>

                        {/* Card Body */}
                        <div className="card-body text-center">
                            <p className="card-text">TripId: {trip.tripId}</p>
                            <h5 className="card-title">{trip.locationName}</h5>
                            <p className="card-text">Description: {trip.tripDescription}</p>
                            <strong>Start Date: {trip.startDate}</strong>
                            <br />
                            <strong>End Date: {trip.endDate}</strong>
                            <p className="card-text">Total budget: {trip.budget}</p>
                            <p className="card-text">No of companion: {trip.noOfCompanion}</p>
                            <Link to={`/tripdetails/${trip.tripId}`} className="btn btn-primary">Book Trip</Link>
                        </div>
                    </div>
                ))}
            </div>
            
            <Myfooter></Myfooter>
        </>
    );
};

export default TripsByCategoryComponent;