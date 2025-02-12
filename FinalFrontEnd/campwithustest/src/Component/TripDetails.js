import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getTripsById } from '../Service/TripService';
import Payment from './Payment';
import MyHeader from './MyHeader';
import Myfooter from './MyFooter';

const TripDetails = () => {
    const { id } = useParams();
    const [trip, setTrip] = useState(null);
    const [showPayment, setShowPayment] = useState(false);

    useEffect(() => {
        if (id) {
            getTripsById(id).then((response) => {
                console.log(response.data); 
                setTrip(response.data);
            }).catch((error) => {
                console.error(error);
            });
        }
    }, [id]);

    if (!trip) {
        return <div>Loading...</div>; // Handle loading state
    }

    return (
        <div>
            <MyHeader></MyHeader>
            <br></br>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "50px" }}>
                <div className="card shadow-sm" style={{ width: "20rem", borderRadius: "12px", overflow: "hidden" }}>

                    <div style={{ textAlign: "center", paddingTop: "15px" }}>
                        <img
                            src="/images/insta_1.jpg"
                            className="card-img-top"
                            style={{
                                width: "90%",
                                height: "180px",
                                objectFit: "cover",
                                borderRadius: "12px"
                            }}
                            alt="Trip"
                        />
                    </div>

                    <div className="card-body text-center">
                        <p className="card-text"><strong>Trip ID:</strong> {trip.tripId}</p>
                        <h5 className="card-title">{trip.locationName}</h5>
                        <p className="card-text">Description: {trip.tripDescription}</p>
                        <p><strong>Start Date:</strong> {trip.startDate}</p>
                        <p><strong>End Date:</strong> {trip.endDate}</p>
                        <p className="card-text">Total Budget: {trip.budget}</p>
                        <p className="card-text">No of Companions: {trip.noOfCompanion}</p>

                        <div className="d-flex justify-content-center mt-3">
                            <button className="btn btn-success" onClick={() => setShowPayment(true)}>💳 Pay Now</button>
                        </div>

                        {showPayment && (
                            <div className="mt-4">
                                <Payment tripId={trip.tripId} budget={trip.budget} userId={trip.userId} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <br></br>
            <Myfooter></Myfooter>
        </div>
    );
};

export default TripDetails;