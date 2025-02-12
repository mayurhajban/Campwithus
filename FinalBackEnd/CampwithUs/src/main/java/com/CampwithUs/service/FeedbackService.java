package com.CampwithUs.service;

import java.util.List;

import com.CampwithUs.dto.FeedbackDto;
import com.CampwithUs.entities.Feedback;

public interface FeedbackService {
	
	public String insertFeedback(FeedbackDto feedbackDto);
	
	public List<Feedback> retrieveFeedback();

}
