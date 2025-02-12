import React, { useEffect, useState } from "react";
import { getAllMatchedTrips } from "../Service/MatchService";
import AdminHeader from './AdminHeader';
import Myfooter from './MyFooter';

export default function AllTrips() {
  const [matchedTrips, setMatchedTrips] = useState([]);

  useEffect(() => {
    fetchMatchedTrips();
  }, []);

  const fetchMatchedTrips = async () => {
    try {
      const response = await getAllMatchedTrips(); // Axios request
      console.log("Matched Trips Data:", response.data); // Debugging
      setMatchedTrips(Array.isArray(response.data) ? response.data : []); // Ensure array
    } catch (error) {
      console.error("Error fetching matched trips:", error);
    }
  };

  return (
    <div>
      <AdminHeader></AdminHeader>
        <div className="container mt-5">
      <h2 className="text-center mb-4" style={{ color: "#333" }}>All Matched Trips</h2>
      <div className="table-responsive">
        <table className="table table-hover shadow-lg"
          style={{ borderRadius: "12px", overflow: "hidden", backgroundColor: "#fff" }}>
          <thead className="table-dark">
            <tr>
              <th>Match ID</th>
              <th>Trip ID</th>
              <th>User ID</th>
              <th>Name</th>
              <th>Match Date</th>
            </tr>
          </thead>
          <tbody>
            {matchedTrips.length > 0 ? (
              matchedTrips.map((trip, index) => (
                <tr key={index}>
                  <td>{trip.matchId ?? "N/A"}</td>
                  <td>{trip.trip.tripId ?? "N/A"}</td>
                  <td>{trip.user.userId ?? "N/A"}</td>
                  <td>{trip.user.name ?? "N/A"}</td>
                  <td>{trip.matchDate ?? "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-muted">No Matched Trips Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
            <Myfooter></Myfooter>
    </div>
  )
}
