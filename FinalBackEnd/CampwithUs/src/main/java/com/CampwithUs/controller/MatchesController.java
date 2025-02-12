package com.CampwithUs.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.CampwithUs.custome_exception.ResourseNotFoundException;
import com.CampwithUs.dto.ApiResponse;
import com.CampwithUs.entities.Match;
import com.CampwithUs.entities.Trip;
import com.CampwithUs.service.MatchesService;



@RestController
@RequestMapping("/match")
@CrossOrigin(origins = "http://localhost:3000")
public class MatchesController {

	@Autowired
	MatchesService matchesService;
	
	@GetMapping("/matchtrip/{id}")
	ResponseEntity<?> getTripMatch(@PathVariable Long id){
		try {
			return ResponseEntity.ok(matchesService.getMatch(id));
		} catch (ResourseNotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage()));
		}
	}
	
	@GetMapping("/matches")
	ResponseEntity<?> getAllTripMatch(){
		List<Match> matches = matchesService.getAllMatches();
		if(matches == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No trip found");
		}
		return ResponseEntity.ok(matches);
	}
	
	@GetMapping("/mytrips/{userId}")
	public ResponseEntity<?> searchByUserId(@PathVariable Long userId) {
		List<Trip> trips;
		try {
			trips = matchesService.getTripByUserId(userId);
			return ResponseEntity.ok(trips);
		} catch (ResourseNotFoundException e) {
			// TODO Auto-generated catch block
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new ApiResponse(e.getMessage()));
		}
	}
	
	
	@DeleteMapping("/remove/{id}")
	ResponseEntity<?> removeMatch(@PathVariable Long id){
		return ResponseEntity.ok(matchesService.deleteMatch(id));	
	}
	
//	@PostMapping("/create/{tripId}")
//    public ResponseEntity<?> createMatch( @PathVariable Long tripId,
//                                              @RequestBody Long userId){
//		try {
//			return ResponseEntity.status(HttpStatus.CREATED).body(matchesService.addMatch(tripId, userId));
//		} catch (ResourseNotFoundException e) {
//			// TODO Auto-generated catch block
//			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage()));
//		}
//	}
	
	
//    @PostMapping("/create")
//    public ResponseEntity<String> createMatch(@RequestBody MatchDTO matchDTO, 
//                                              @AuthenticationPrincipal UserDetails userDetails) {
//        // Get logged-in user
//        Users user = userRepository.findByEmail(userDetails.getUsername())  
//                .orElseThrow(() -> new RuntimeException("User not found"));
//
//        // Get the trip entity
//        Trip trip = tripRepository.findById(matchDTO.getTripId())
//                .orElseThrow(() -> new RuntimeException("Trip not found"));
//
//        // Create new Match object
//        Match match = new Match();
//        match.setTrip(trip);
//        match.setUser(user);
//        matchRepository.save(match);
//
//        return ResponseEntity.ok("Match created successfully!");
//    }
	
}
