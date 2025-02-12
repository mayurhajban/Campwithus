package com.CampwithUs.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.CampwithUs.custome_exception.ResourseNotFoundException;
import com.CampwithUs.dto.ApiResponse;
import com.CampwithUs.dto.SearchByLocAndDateDto;
import com.CampwithUs.dto.TripDto;
import com.CampwithUs.entities.Trip;
import com.CampwithUs.service.TripService;


@RestController
@RequestMapping("/trip")
@CrossOrigin(origins = "http://localhost:3000")
public class TripController {
	
	@Autowired
	TripService tripService;
	
	@GetMapping("/trips")
	public ResponseEntity<?> getTrips(){
		List<Trip> trips = tripService.getAllTrip();
		return ResponseEntity.ok(trips);
	}
	
	@GetMapping("/tripdetails/{id}")
	public ResponseEntity<?>  getTripById(@PathVariable Long id) {
		try {
			Trip tripDetails = tripService.getTripDetails(id);
			return  ResponseEntity.ok(tripDetails);
		} catch (ResourseNotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse("User Not Available "+ e.getMessage()));
		}
	}
	
	@PostMapping("/addtrip")
	public ResponseEntity<?> newTrip(@RequestBody TripDto newTrip ){
		try {
			System.out.println(newTrip);
			tripService.addTrip(newTrip);
			return ResponseEntity.status(HttpStatus.CREATED).build();
		} catch (ResourseNotFoundException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse("Unable to create User"));
		}
	}
	
	@PutMapping("/modify/{id}")
	public ResponseEntity<?>editTrip(@PathVariable Long id, @RequestBody TripDto edittrip ){
		try {
			String update=tripService.updateTrip(id,edittrip);
			return ResponseEntity.ok(new ApiResponse(update));
		} catch (ResourseNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return ResponseEntity.ok(new ApiResponse(e.getMessage()));
		}
	}
	
	@DeleteMapping("/remove/{id}")
	public ResponseEntity<?>removeTrip(@PathVariable Long id ){
		try {
			String msg =tripService.deleteTrip(id);
			return ResponseEntity.ok(new ApiResponse(msg));
		} catch (ResourseNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return ResponseEntity.ok(new ApiResponse(e.getMessage()));
		}	
	}

	@GetMapping("/search/{location}")
	public ResponseEntity<?> searchByLocation(@PathVariable String location) {
		List <Trip> li = tripService.getTripByLocation(location);
		if(li!=null) {
			return ResponseEntity.ok(li);
		}
		return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new ApiResponse("No trip available for this location"));
	}
	
	@GetMapping("/budget")
	public ResponseEntity<?> sortbybudget() {
		List <Trip> li = tripService.getTripByBudget();
		if(li!=null) {
			return ResponseEntity.ok(li);
		}
		return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new ApiResponse("no trip!!!"));
	}
	
	@PostMapping("/searchbylocationanddate")
	public ResponseEntity<?> searchByLocationNameAndDate(@RequestBody SearchByLocAndDateDto dto) {
		try {
			String location = dto.getLocation();
			LocalDate startDate = dto.getStartDate();
			List <Trip> li = tripService.searchByLocationAndDate(location, startDate);
			return ResponseEntity.ok(li);
		} catch (ResourseNotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
	}
	
	@GetMapping("/searchcategory/{categoryId}")
	public ResponseEntity<?> searchByCategory(@PathVariable Long categoryId) {
		List <Trip> trips = tripService.getTripByCategory(categoryId);
		if(trips!=null) {
			return ResponseEntity.ok(trips);
		}
		return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new ApiResponse("No trip available for this category"));
	}
	
	
	@GetMapping("/searchuser/{userId}")
	public ResponseEntity<?> searchByUser(@PathVariable Long userId) {
		List <Trip> trips = tripService.getTripByUser(userId);
		if(trips!=null) {
			return ResponseEntity.ok(trips);
		}
		return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new ApiResponse("No trip available for this User"));
	}
	
}
