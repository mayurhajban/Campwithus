package com.CampwithUs.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.CampwithUs.entities.Category;
import com.CampwithUs.entities.Trip;
import com.CampwithUs.entities.Users;


@Repository
public interface TripRepository extends JpaRepository<Trip, Long>{
	
	List<Trip> findByLocationName(String locationName);
	
	List<Trip> findByStartDateGreaterThanEqualOrderByStartDate(LocalDate startDate);
	
	List<Trip> findByLocationNameAndStartDate(String locationName, LocalDate startDate);
	
	List<Trip> findByTripCategory(Category tripCategory);
	
	List<Trip> findByUser(Users user);
	
}
