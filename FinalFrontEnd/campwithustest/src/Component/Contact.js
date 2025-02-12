import React, { useState } from "react";
import MyHeader from "./MyHeader";
import Myfooter from "./MyFooter";
import { sendFeedback } from "../Service/ContactService";

function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [responseMessage, setResponseMessage] = useState("");

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload

        try {
            const response = await sendFeedback(formData); // Use the API service function
            if (response.status === 201) {
                setResponseMessage("Feedback sent successfully!");
                setFormData({ name: "", email: "", message: "" }); // Clear form
            } else {
                setResponseMessage("Failed to send feedback. Try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            setResponseMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div>
            <MyHeader />
            <br />
            <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "90vh" }}>
                <div className="card shadow-lg p-4" style={{ maxWidth: "600px", width: "100%", borderRadius: "12px", background: "#f8f9fa" }}>
                    <div className="card-body">
                        <h2 className="text-center text-primary mb-4">We Value Your Feedback</h2>
                        <p className="text-center text-muted">
                            Let us know your thoughts! We appreciate your feedback to improve our services.
                        </p>

                        {responseMessage && <div className="alert alert-info text-center">{responseMessage}</div>}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" className="form-control" id="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="message" className="form-label">Message</label>
                                <textarea className="form-control" id="message" rows="4" placeholder="Write your message..." value={formData.message} onChange={handleChange} required></textarea>
                            </div>

                            <button type="submit" className="btn btn-primary w-100">Send Feedback</button>
                        </form>

                        <div className="text-center mt-4">
                            <p className="text-muted">Or reach out to us:</p>
                            <p className="mb-1"><strong>📞 Phone:</strong> +91 72584*****</p>
                            <p className="mb-1"><strong>📧 Email:</strong> info@campwithus.com</p>
                            <p><strong>📍 Address:</strong> 123 Main Street, Pune, (M.H) INDIA</p>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <Myfooter />
        </div>
    );
}

export default Contact;
