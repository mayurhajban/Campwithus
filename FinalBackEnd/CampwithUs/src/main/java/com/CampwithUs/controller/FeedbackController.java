package com.CampwithUs.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.CampwithUs.dto.ApiResponse;
import com.CampwithUs.dto.FeedbackDto;
import com.CampwithUs.entities.Feedback;
import com.CampwithUs.service.FeedbackService;

@RestController
@RequestMapping("/contact")
@CrossOrigin(origins = "http://localhost:3000")
public class FeedbackController {

	@Autowired
	FeedbackService feedbackService;
	
	@PostMapping("/send-message")
	ResponseEntity<?> addFeedback(@RequestBody FeedbackDto feedbackDto){
		return ResponseEntity.status(HttpStatus.CREATED).body(feedbackService.insertFeedback(feedbackDto));
	}
	
	@GetMapping("/get-message")
	ResponseEntity<?> getFeedback(){
		List<Feedback> feedbacks = feedbackService.retrieveFeedback();
		if(feedbacks != null) {
			return ResponseEntity.ok(feedbacks);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse("Feedback not found"));
	}
	
}
