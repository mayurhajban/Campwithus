import axios from 'axios';
let baseurl = "http://localhost:8080/trip/"

const getAuthHeaders = () => {
   const token = localStorage.getItem('token');
   return {
     Authorization: `Bearer ${token}`, // Attach JWT token
     'Content-Type': 'application/json',
   };
 };
 
 export const getAllTrips = () => {
   return axios.get(`${baseurl}trips`, { headers: getAuthHeaders() });
 };
 
 export const getTripsById = (id) => {
   return axios.get(`${baseurl}tripdetails/${id}`, { headers: getAuthHeaders() });
 };
 
 export const sortByBudget = () => {
   return axios.get(`${baseurl}budget`, { headers: getAuthHeaders() });
 };
 
 export const addTrip = (tripData) => {
   return axios.post(`${baseurl}addtrip`, tripData, { headers: getAuthHeaders() });
 };
 
 export const searchByLocation = (location) => {
   return axios.get(`${baseurl}search/${location}`, { headers: getAuthHeaders() });
 };

export const searchByCategory = (categoryId) => {
   const token = localStorage.getItem('token'); // Retrieve JWT from localStorage
 
   return axios.get(`${baseurl}searchcategory/${categoryId}`, {
     headers: {
       Authorization: `Bearer ${token}`, // Attach token in the header
       'Content-Type': 'application/json'
     }
   });
 };