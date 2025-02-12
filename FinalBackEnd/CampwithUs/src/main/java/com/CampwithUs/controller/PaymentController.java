package com.CampwithUs.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.CampwithUs.custome_exception.ResourseNotFoundException;
import com.CampwithUs.dto.ApiResponse;
import com.CampwithUs.dto.PaymentDto;
import com.CampwithUs.entities.Payment;
import com.CampwithUs.service.MatchesService;
import com.CampwithUs.service.PaymentService;

@RestController
@RequestMapping("/payment")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {
	
	@Autowired
	PaymentService paymentService;
	
	@Autowired
	MatchesService matchesService;
	
	@GetMapping("/getall")
	ResponseEntity<?> seeAllPayments(){
		List<Payment> payments = paymentService.getAllPayments();
		if(payments !=null)
			return ResponseEntity.ok(payments);
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse("No payment found"));
	}
	
	@GetMapping("/getpayment/{paymentId}")
	ResponseEntity<?> seePaymentById(@PathVariable Long paymentId){
		Payment payment;
		try {
			payment = paymentService.getPaymetById(paymentId);
			return ResponseEntity.ok(payment);
		} catch (ResourseNotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage()));
		}
	}

	@PostMapping("/addpayment")
	ResponseEntity<?> insertPayment(@RequestBody PaymentDto paymentDto){
		try {
			matchesService.addMatch(paymentDto.getTripId(), paymentDto.getUserId());
			System.out.println(paymentDto.getCardNo());
			System.out.println(paymentDto.getCardExpireDate());
			return ResponseEntity.status(HttpStatus.CREATED).body(paymentService.addPaymet(paymentDto));
		} catch (ResourseNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage()));
		}
		
	}

}
