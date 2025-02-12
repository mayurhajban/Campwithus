package com.CampwithUs.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.CampwithUs.entities.Match;
import com.CampwithUs.entities.Users;

import java.util.List;

@Repository
public interface MatchRepository extends JpaRepository<Match, Long>{
	
	List<Match> findByUser(Users user);

}
