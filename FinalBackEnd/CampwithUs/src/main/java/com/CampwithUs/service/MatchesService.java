package com.CampwithUs.service;

import java.util.List;

import com.CampwithUs.custome_exception.ResourseNotFoundException;
import com.CampwithUs.entities.Match;
import com.CampwithUs.entities.Trip;

public interface MatchesService {
	
	Match getMatch(Long id)throws ResourseNotFoundException;
	
	List<Match> getAllMatches();
	
	String deleteMatch(Long id);

	Match addMatch(Long tripId, Long userId) throws ResourseNotFoundException;
	
	List<Trip> getTripByUserId(Long userId)  throws ResourseNotFoundException ;

}
