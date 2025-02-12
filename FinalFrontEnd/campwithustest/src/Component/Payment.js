import React, { useState } from 'react';
import { processPayment } from '../Service/PaymentService';
import { useNavigate } from 'react-router-dom';

export default function Payment({ tripId, budget, userId }) {
    const myId = localStorage.getItem("userId");
    const navigate = useNavigate();
    
    // Initialize state properly
    const [paymentData, setPaymentData] = useState({
        cardNo: "",
        cvv: "",
        cardExpireDate: "",
        contactNo: "",
        userId: myId || "",  
        tripId: tripId || "",   
        paidAmount: budget || 0,    
    });

    // Handle input changes
    const handleChange = (e) => {
        setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Convert necessary fields to numbers before sending
        const processedData = {
            ...paymentData,
            cardNo: Number(paymentData.cardNo),  
            contactNo: Number(paymentData.contactNo),
        };

        try {
            await processPayment(processedData);
            alert("Payment Successful!");
            navigate("/trips");
        } catch (error) {
            console.error("Payment Error:", error);
            alert("Payment Failed. Try again.");
        }
    };

    return (
        <div>
            <div className="container d-flex justify-content-center mt-4">
                <div className="card p-4 shadow-lg" style={{ maxWidth: "420px", width: "100%", borderRadius: "15px", background: "#f9f9f9", border: "1px solid #ddd" }}>
                    <h3 className="text-center mb-3">💳 Secure Payment</h3>

                    <div className="mb-3 text-center">
                        <strong>Trip ID:</strong> {tripId || "N/A"} <br />
                        <strong>Amount to Pay:</strong> ${budget || "0.00"}
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Card Number</label>
                            <input type="text" className="form-control" name="cardNo" value={paymentData.cardNo} onChange={handleChange} placeholder="1234 5678 9012 3456" required />
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <label className="form-label">CVV</label>
                                <input type="password" className="form-control" name="cvv" value={paymentData.cvv} onChange={handleChange} placeholder="123" required />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Expiry Date</label>
                                <input type="date" className="form-control" name="cardExpireDate" value={paymentData.cardExpireDate} onChange={handleChange} required />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Contact Number</label>
                            <input type="text" className="form-control" name="contactNo" value={paymentData.contactNo} onChange={handleChange} placeholder="+1 234 567 890" required />
                        </div>

                        <button type="submit" className="btn btn-success w-100" style={{ fontSize: "18px", padding: "10px" }}>
                            💸 Make Payment
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
