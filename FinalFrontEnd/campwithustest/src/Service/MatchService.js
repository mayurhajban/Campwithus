import axios from "axios";

let baseUrl = "http://localhost:8080/match/";

// Function to get JWT token from localStorage
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        Authorization: `Bearer ${token}`, // Attach JWT token
        "Content-Type": "application/json",
    };
};

export const createMatch = async (tripId, userId) => {
    return await axios.post(`${baseUrl}create/${tripId}`, userId, { headers: getAuthHeaders() });
};

export const searchByUserId = (userId) => {
    return axios.get(`${baseUrl}mytrips/${userId}`, { headers: getAuthHeaders() });
};

export const getUserTrips = async (userId) => {
    return await axios.get(`${baseUrl}mytrips/${userId}`, { headers : getAuthHeaders()});
};

export const getAllMatchedTrips = async () => {
return await axios.get(`${baseUrl}matches`, {headers: getAuthHeaders() });
};
