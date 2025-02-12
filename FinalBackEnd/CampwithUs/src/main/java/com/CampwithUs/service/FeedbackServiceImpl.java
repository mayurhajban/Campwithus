package com.CampwithUs.service;

import java.time.LocalDate;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.CampwithUs.dto.FeedbackDto;
import com.CampwithUs.entities.Feedback;
import com.CampwithUs.repositories.FeedbackRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class FeedbackServiceImpl implements FeedbackService{

	@Autowired
	FeedbackRepository feedbackRepository;
	
	@Autowired
	ModelMapper mapper;
	
	@Override
	public String insertFeedback(FeedbackDto feedbackDto) {
		Feedback feedback = mapper.map(feedbackDto, Feedback.class);
		feedback.setDate(LocalDate.now());
		feedbackRepository.save(feedback);
		return "Feedback Inserted successfully";
	}

	@Override
	public List<Feedback> retrieveFeedback() {
		List<Feedback> feedbacks = feedbackRepository.findAll();
		if(feedbacks != null) {
			return feedbacks;
		}
		return null;
	}

}
