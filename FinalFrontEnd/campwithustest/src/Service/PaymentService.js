import axios from "axios";

const baseurl = "http://localhost:8080/payment"; 

// Function to get JWT token from localStorage
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        Authorization: `Bearer ${token}`, // Attach JWT token
        "Content-Type": "application/json",
    };
};

export const processPayment = (paymentData) => {
    return axios.post(`${baseurl}/addpayment`, paymentData, { headers: getAuthHeaders() });
};

export const getAllPayments = () => {
    return axios.get(`${baseurl}/getall`, { headers: getAuthHeaders() });
};

