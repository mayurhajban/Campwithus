import React, { useEffect, useState } from 'react'
import MyHeader from './MyHeader'
import { Link, useParams } from 'react-router-dom'
import { searchByUserId } from '../Service/MatchService';

const MyTripComponent = () => {
    const [trips, setTrips] = useState([]);
    const [message, setMessage] = useState('');
    const { userId } = useParams();

    useEffect(() => {
        fetchTripsByUserId();
    }, [userId]);

    const fetchTripsByUserId = () => {
        searchByUserId(userId).then((response) => {
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
                    <div className="card" style={{ width: "18rem" }} key={trip.id || trip.tripId}>
                        <img src="/images/insta_1.jpg" className="card-img-top" style={{ width: "16rem" }} alt="Trip" />
                        <div className="card-body">
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
        </>
    );
};

export default MyTripComponent;