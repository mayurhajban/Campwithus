import axios from "axios";

const baseurl = 'http://localhost:8080/contact/';

// Function to get JWT token from localStorage (if needed for authentication)
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
};

// Function to send feedback
export const sendFeedback = (formData) => {
    return axios.post(`${baseurl}send-message`, formData, { headers: getAuthHeaders() });
};

// Function to send feedback
export const getFeedback = () => {
    return axios.get(`${baseurl}get-message`,  { headers: getAuthHeaders() });
};
