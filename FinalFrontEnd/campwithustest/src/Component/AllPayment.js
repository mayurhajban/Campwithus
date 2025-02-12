import React, { useEffect, useState } from "react";
import { getAllPayments } from "../Service/PaymentService";
import AdminHeader from './AdminHeader';
import Myfooter from './MyFooter';

export default function AllPayment() {

    const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await getAllPayments(); // Axios request
      console.log("Payment Data:", response.data); // Debugging: Check structure
      setPayments(Array.isArray(response.data) ? response.data : []); // Ensure array format
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };


  return (
    <div>
        <AdminHeader></AdminHeader>
        <div className="container mt-5">
      <h2 className="text-center mb-4" style={{ color: "#333" }}>All Payments</h2>
      <div className="table-responsive">
        <table className="table table-hover shadow-lg"
          style={{ borderRadius: "12px", overflow: "hidden", backgroundColor: "#fff" }}>
          <thead className="table-dark">
            <tr>
              <th>Paid Amount</th>
              <th>Card Number</th>
              <th>Contact</th>
              <th>Card Expiry Date</th>
              <th>Trip ID</th>
              <th>User ID</th>
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? (
              payments.map((payment, index) => (
                <tr key={index}>
                  <td>{payment.paidAmount ?? "N/A"}</td>
                  <td>{payment.cardNo ?? "N/A"}</td>
                  <td>{payment.contactNo ?? "N/A"}</td>
                  <td>{payment.cardExpireDate ?? "N/A"}</td>
                  <td>{payment.trip.tripId ?? "N/A"}</td>
                  <td>{payment.user.userId ?? "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted">No Payments Found</td>
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
