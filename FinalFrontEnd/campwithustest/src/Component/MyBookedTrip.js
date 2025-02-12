import React, { useEffect, useState } from 'react';
import { getUserTrips } from '../Service/MatchService';
import MyHeader from './MyHeader';
import Myfooter from './MyFooter';

export default function MyBookedTrip() {

    const [trips, setTrips] = useState([]); // Initialize as an array

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                //   const userId = localStorage.getItem('userId');
                //   if (!userId) {
                //     console.error("User ID not found in localStorage");
                //     return;
                //   }
                const userId = localStorage.getItem("userId");

                const response = await getUserTrips(userId);
                const tripList = response.trips || response.data || []; 
                if (Array.isArray(tripList)) {
                    setTrips(tripList);
                } else {
                    console.error("Unexpected response format: trips is not an array", response);
                    setTrips([]); // Ensure it's an array
                }
            } catch (error) {
                console.error('Error fetching trips:', error);
                setTrips([]); // Ensure state is an empty array in case of failure
            }
        };

        fetchTrips();
    }, []);

    const styles = {
        ticketCard: {
            background: "#FAF3E0", // Soft Cream / Off-White
            borderRadius: "16px",
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)", // Soft Shadow
            overflow: "hidden",
            border: "2px dashed #D2B48C", // Modern Dashed Border (Tan/Brown)
            transition: "transform 0.3s ease-in-out",
            cursor: "pointer",
            padding: "20px",
        },
        ticketHeader: {
            background: "#FF8C00", // Warm Orange (Highlight)
            color: "white",
            padding: "12px",
            textAlign: "center",
            fontSize: "1.4rem",
            fontWeight: "bold",
            borderRadius: "14px 14px 0 0",
        },
        ticketBody: {
            display: "flex",
            justifyContent: "space-between",
            padding: "15px",
        },
        ticketInfo: {
            flex: 1,
            padding: "0 15px",
        },
        ticketDescription: {
            background: "rgba(255, 255, 255, 0.9)",
            padding: "12px",
            textAlign: "center",
            fontStyle: "italic",
            fontSize: "0.95rem",
            borderTop: "1px dashed #D2B48C",
            borderRadius: "0 0 14px 14px",
        }
    };


    return (
        <div>
            <MyHeader></MyHeader>
            <br></br>
            <div className="container mt-5">
                <h2 className="text-center mb-4">✈️ My Booked Trips</h2>
                {trips.length === 0 ? (
                    <p className="text-center">You haven’t booked any trips yet. Time to plan one! 🌍</p>
                ) : (
                    <div className="row">
                        {trips.map((trip) => (
                            <div key={trip.tripId} className="col-12 mb-4">
                                {/* Ticket-Style Card */}
                                <div style={styles.ticketCard}>
                                    {/* Destination Header */}
                                    <div style={styles.ticketHeader}>
                                        <h4>{trip.locationName} 🌟</h4>
                                    </div>

                                    {/* Ticket Body */}
                                    <div style={styles.ticketBody}>
                                        <div style={styles.ticketInfo}>
                                            <p><strong>Trip ID:</strong> {trip.tripId}</p>
                                            <p><strong>Start:</strong> {trip.startDate}</p>
                                            <p><strong>End:</strong> {trip.endDate}</p>
                                        </div>
                                        <div style={styles.ticketInfo}>
                                            <p><strong>Category:</strong> {trip.categoryName}</p>
                                            <p><strong>Budget:</strong> ${trip.budget}</p>
                                            <p><strong>Companions:</strong> {trip.noOfCompanion}</p>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div style={styles.ticketDescription}>
                                        <p>{trip.tripDescription}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <br></br>
            <Myfooter></Myfooter>

        </div>
    )
}
