import React, { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import Myfooter from "./MyFooter";
import { getFeedback } from "../Service/ContactService";

export default function Feedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await getFeedback(); // Axios request
      console.log("Feedback Data:", response.data); // Debugging
      setFeedbacks(Array.isArray(response.data) ? response.data : []); // Ensure array
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  return (
    <div>
      <AdminHeader />
      <div className="container mt-5">
        <h2 className="text-center mb-4" style={{ color: "#333" }}>All Feedbacks</h2>
        <div className="table-responsive">
          <table className="table table-hover shadow-lg" style={{ borderRadius: "12px", overflow: "hidden", backgroundColor: "#fff" }}>
            <thead className="table-dark">
              <tr>
                <th>Feedback ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.length > 0 ? (
                feedbacks.map((feedback, index) => (
                  <tr key={index}>
                    <td>{feedback.feedbackId ?? "N/A"}</td>
                    <td>{feedback.name ?? "N/A"}</td>
                    <td>{feedback.email ?? "N/A"}</td>
                    <td>{feedback.message ?? "N/A"}</td>
                    <td>{feedback.date ?? "N/A"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-muted">No Feedbacks Found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Myfooter />
    </div>
  );
}
