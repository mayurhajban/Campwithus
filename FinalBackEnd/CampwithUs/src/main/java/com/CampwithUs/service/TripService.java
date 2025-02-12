package com.CampwithUs.service;

import java.time.LocalDate;
import java.util.List;

import com.CampwithUs.custome_exception.ResourseNotFoundException;
import com.CampwithUs.dto.TripDto;
import com.CampwithUs.entities.Trip;


public interface TripService {

	List<Trip> getAllTrip();
	
	Trip getTripDetails(Long id) throws ResourseNotFoundException;
	
	Trip addTrip(TripDto newTrip) throws ResourseNotFoundException;
	
	String updateTrip(Long id, TripDto editTrip)throws ResourseNotFoundException;
	
	String deleteTrip(Long id)throws ResourseNotFoundException;
	
	List<Trip>getTripByLocation(String location);
	
	List<Trip>getTripByBudget();
	
	List<Trip> searchByLocationAndDate(String location, LocalDate startDate) throws ResourseNotFoundException ;
	
	List<Trip>getTripByCategory(Long categoryId);
	
	List<Trip>getTripByUser(Long userId);
	
}
