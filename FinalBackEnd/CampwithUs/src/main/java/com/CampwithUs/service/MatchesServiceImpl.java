package com.CampwithUs.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.CampwithUs.custome_exception.ResourseNotFoundException;
import com.CampwithUs.entities.Match;
import com.CampwithUs.entities.Trip;
import com.CampwithUs.entities.Users;
import com.CampwithUs.repositories.MatchRepository;
import com.CampwithUs.repositories.TripRepository;
import com.CampwithUs.repositories.UserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class MatchesServiceImpl implements MatchesService {

	@Autowired
	MatchRepository matchRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	TripRepository tripRepository;
	
	@Override
	public Match getMatch(Long id) throws ResourseNotFoundException {
		if(matchRepository.existsById(id)) {
			return matchRepository.findById(id).orElseThrow(() -> new ResourseNotFoundException("No match found"));
		}
		return null;
	}

	@Override
	public List<Match> getAllMatches() {
		return matchRepository.findAll();
	}

	@Override
	public String deleteMatch(Long id) {
		if(matchRepository.existsById(id)) {
			matchRepository.deleteById(id);
			return "Match deleted Successfully";
		}
		return "No match found";
	}

	@Override
	public Match addMatch(Long tripId, Long userId) throws ResourseNotFoundException {
		Users user = userRepository.findById(userId).orElseThrow(() -> new ResourseNotFoundException("User not found"));
		Trip trip = tripRepository.findById(tripId).orElseThrow(() -> new ResourseNotFoundException("Trip not found"));
		Match match = new Match();
		match.setTrip(trip);
		match.setUser(user);
		matchRepository.save(match);
		return match;
	}

	@Override
	public List<Trip> getTripByUserId(Long userId) throws ResourseNotFoundException {
		List<Trip> trips = new ArrayList<>();
		List<Match> matches = matchRepository.findByUser(userRepository.findById(userId).orElseThrow(() -> new ResourseNotFoundException("No trip found")));
		for(Match m : matches) {
			trips.add(m.getTrip());
		}
		return trips;
	}

}
