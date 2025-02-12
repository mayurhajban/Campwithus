import axios from "axios";

const baseUrl = "http://localhost:8080/user/"; // Your backend URL

// Function to get JWT token from localStorage
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        Authorization: `Bearer ${token}`, // Attach JWT token
        "Content-Type": "application/json",
    };
};

export const getAllUsers = () => {
    return axios.get(`${baseUrl}users`, { headers: getAuthHeaders() });
};

export const getUserById = (uid) => {
    return axios.get(`${baseUrl}userdetails/${uid}`, { headers: getAuthHeaders() });
};

export const updateUser = (user) => {
    return axios.put(`${baseUrl}update/${user.uid}`, user, { headers: getAuthHeaders() });
};

export const deleteUser = (uid) => {
    return axios.delete(`${baseUrl}delete/${uid}`, { headers: getAuthHeaders() });
};

export const updateUserProfile = async (userId, profileData) => {
    try {
        await axios.put(`${baseUrl}update/${userId}`, profileData, { headers: getAuthHeaders() });
    } catch (error) {
        console.error("Error updating user profile:", error);
        throw error;
    }
};
