import axios from "axios";

let baseUrl = "http://localhost:8080/category/";

// Function to get JWT token from localStorage
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        Authorization: `Bearer ${token}`, // Attach JWT token
        "Content-Type": "application/json",
    };
};

export const allCategories = () => {
    return axios.get(`${baseUrl}categories`, { headers: getAuthHeaders() });
};
