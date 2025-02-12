import axios from 'axios';

const baseurl = 'http://localhost:8080/validate';

export const login = async (formData) => {
  try {
    const response = await axios.post(`${baseurl}/login`, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyEmail = async (email) => {
  try {
    const response = await axios.post(`${baseurl}/checkemail`,  JSON.stringify({email}), 
      { headers: { 'Content-Type': 'application/json' } });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      `${baseurl}/adduser`,
      JSON.stringify(userData),
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatePassword = async (formData) => {
  try {
      const response = await axios.put('http://localhost:8080/validate/changePassword', formData, {
          headers: {
              'Content-Type': 'application/json'
          }
      });
      return response.data;
  } catch (error) {
      console.error("Axios Error:", error.response?.data || error.message);
      return null;
  }
};