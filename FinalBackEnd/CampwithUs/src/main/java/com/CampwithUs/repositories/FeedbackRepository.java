package com.CampwithUs.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.CampwithUs.entities.Feedback;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long>{

}
