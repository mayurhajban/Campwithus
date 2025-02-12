import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom';
import { getAllTrips } from '../Service/TripService';
import { sortByBudget, searchByLocation } from '../Service/TripService';
import MyHeader from './MyHeader';
import MyFooter from './MyFooter';

const TripsComponent = () => {

    const [trips, setTrips] = useState([])
    const [location, setLocation] = useState('');
    const [message, setMessage] = useState(''); // State for no results message

    useEffect(() => {
        getAllTrips().then((response) => {
            setTrips(response.data);
        }).catch((error) => {
            console.error(error);
        })
    }, []);

    const sortByBudgetFunc = () => {
        sortByBudget().then((response) => {
            setTrips(response.data);
            if (response.data.length === 0) {
                setMessage("No trips found after sorting.");
            } else {
                setMessage('');
            }
        }).catch((error) => {
            console.error(error);
            setMessage("Error sorting trips.");
        });
    };

    const searchByLoc = async (e) => {
        e.preventDefault();
        if (!location) {
            alert("Please enter a location to search.");
            return;
        }

        try {
            console.log(location);
            const response = await searchByLocation(location);
            console.log(response.data);
            if (response.data.length === 0) {
                setMessage(`No trips found for "${location}".`);
            } else {
                setMessage('');
            }
            setTrips(response.data);
        } catch (error) {
            console.error("Error searching trips by location:", error);
            setTrips([]);
            setMessage("Error searching trips. Please try again.");
        }
    };

    return (
        <>
            <MyHeader></MyHeader>
            <br></br>
            <div className="container my-4">
                {/* Centered Search Bar & Right-Aligned Sort Button */}
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-7 col-sm-12">
                        <form className="input-group" onSubmit={searchByLoc}>
                            {/* Search Input */}
                            <input
                                className="form-control"
                                type="search"
                                placeholder="Search for a trip..."
                                aria-label="Search"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                style={{
                                    borderRadius: "6px",
                                    fontSize: "16px",
                                    padding: "12px",
                                    height: "45px",  // Consistent height
                                    flex: "1" // Makes search box longer
                                }}
                            />

                            {/* Search Button */}
                            <button
                                className="btn btn-outline-success"
                                type="submit"
                                style={{
                                    borderRadius: "6px",
                                    fontWeight: "500",
                                    padding: "12px 16px",
                                    fontSize: "16px",
                                    height: "45px", // Matching height
                                    marginLeft: "6px"
                                }}
                            >
                                Search
                            </button>

                            {/* Sort Button on the Right */}
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={sortByBudgetFunc}
                                style={{
                                    borderRadius: "6px",
                                    fontWeight: "500",
                                    padding: "12px 16px",
                                    fontSize: "16px",
                                    height: "45px", // Matching height
                                    marginLeft: "6px"
                                }}
                            >
                                Sort By Budget
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <br></br>
            <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "30px",
                justifyContent: "center",
                alignItems: "center"
            }}>
                {trips.map(trip => (
                    <div
                        className="card shadow-sm"
                        style={{
                            width: "20rem",
                            borderRadius: "12px",
                            overflow: "hidden"
                        }}
                        key={trip.id || trip.tripId}
                    >
                        {/* Centering Image */}
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
                                alt="Trip image"
                            />
                        </div>

                        <div className="card-body">
                            <p className="card-text"><strong>Trip ID:</strong> {trip.tripId}</p>
                            <h5 className="card-title">{trip.locationName}</h5>
                            <p className="card-text">Description: {trip.tripDescription}</p>
                            <strong>Start Date: {trip.startDate}</strong>
                            <br />
                            <strong>End Date: {trip.endDate}</strong>
                            <p className="card-text">Total Budget: {trip.budget}</p>
                            <p className="card-text">No of Companions: {trip.noOfCompanion}</p>
                            <Link to={`/tripdetails/${trip.tripId}`} className="btn btn-primary">Book Trip</Link>
                        </div>
                    </div>
                ))}
            </div>
            <br></br>
            <MyFooter></MyFooter>
        </>
    )
}

export default TripsComponent
