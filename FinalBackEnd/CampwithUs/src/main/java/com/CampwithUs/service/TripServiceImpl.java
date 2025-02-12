package com.CampwithUs.service;

import java.time.LocalDate;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.CampwithUs.custome_exception.ResourseNotFoundException;
import com.CampwithUs.dto.TripDto;
import com.CampwithUs.entities.Category;
import com.CampwithUs.entities.Trip;
import com.CampwithUs.entities.Users;
import com.CampwithUs.repositories.CategoryRepository;
import com.CampwithUs.repositories.TripRepository;
import com.CampwithUs.repositories.UserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class TripServiceImpl implements TripService{

	@Autowired
	TripRepository tripRepository;
	
	@Autowired
	CategoryRepository categoryRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	ModelMapper mapper;
	
	@Override
	public List<Trip> getAllTrip() {
		List<Trip> tripList = tripRepository.findAll();
		return tripList;
	}

	@Override
	public Trip getTripDetails(Long id) throws ResourseNotFoundException {
		if(tripRepository.existsById(id)) {
			return tripRepository.findById(id).orElseThrow(() -> new ResourseNotFoundException("Trip Not Found"));
		}
		throw new ResourseNotFoundException("Trip Not Found");
	}

	@Override
	public Trip addTrip(TripDto newTrip) throws ResourseNotFoundException {
		Category category = categoryRepository.findById(newTrip.getCategoryId()).orElseThrow(() -> new ResourseNotFoundException("Category Not found"));
		Users user = userRepository.findById(newTrip.getUserId()).orElseThrow(() -> new ResourseNotFoundException("User Not Found"));
		
		Trip trip = mapper.map(newTrip, Trip.class);
		trip.setTripCategory(category);
		trip.setUser(user);
		
		tripRepository.save(trip);
		
		return trip;
		
	}

	@Override
	public String updateTrip(Long id, TripDto editTrip) throws ResourseNotFoundException {
		if(tripRepository.existsById(id)) {
			Trip trip = mapper.map(editTrip, Trip.class);
			trip.setTripId(id);
			
			// Ensure that userId is set correctly
	        if (editTrip.getUserId() != null) {
	        	trip.setUser(userRepository.findById(id).orElseThrow(() -> new ResourseNotFoundException("User ID cannot be null")));
	           // trip.setUser (new User(editTrip.getUser Id())); // Assuming you have a User constructor that takes an ID
	        }
			
			if (editTrip.getCategoryId() != null) {
				trip.setTripCategory(categoryRepository.findById(editTrip.getCategoryId()).orElseThrow(() -> new ResourseNotFoundException("Category ID cannot be null")));
	        }
			
			tripRepository.save(trip);
			return "Trip Updated successfully";
		}
		throw new ResourseNotFoundException("Trip not found to update");
	}

	@Override
	public String deleteTrip(Long id) throws ResourseNotFoundException {
		if(tripRepository.existsById(id)) {
			tripRepository.deleteById(id);
			return "Trip deleted successfully";
		}
		throw new ResourseNotFoundException("Trip not found to delete");
	}

	@Override
	public List<Trip> getTripByLocation(String location) {
		List<Trip> tList = tripRepository.findByLocationName(location);
		return tList;
	}

	@Override
	public List<Trip> getTripByBudget() {
		List<Trip> tList = tripRepository.findAll();
		Collections.sort(tList, new Comparator<Trip>() {
			@Override
			public int compare(Trip trip1, Trip trip2) {
				return Double.compare(trip1.getBudget(), trip2.getBudget());
			}
		});
		return tList;
	}
	//We can use OrderBy from JPA for simplicity here

	@Override
	public List<Trip> searchByLocationAndDate(String location, LocalDate startDate) throws ResourseNotFoundException {
		List<Trip> trips = tripRepository.findByLocationNameAndStartDate(location, startDate);
		if(trips != null)
			return trips;
		throw new ResourseNotFoundException("NO TRIPS ON THIS DATE FOR THIS LOCATION");
	}

	@Override
	public List<Trip> getTripByCategory(Long categoryId) {
		if(categoryRepository.existsById(categoryId)) {
			Category category = categoryRepository.findById(categoryId).orElseThrow();
			List<Trip> trips = tripRepository.findByTripCategory(category);
			return trips;
		}
		return null;
	}

	@Override
	public List<Trip> getTripByUser(Long userId) {
		if(userRepository.existsById(userId)) {
			Users user = userRepository.findById(userId).orElseThrow();
			return tripRepository.findByUser(user);
		}
		return null;
	}

}
