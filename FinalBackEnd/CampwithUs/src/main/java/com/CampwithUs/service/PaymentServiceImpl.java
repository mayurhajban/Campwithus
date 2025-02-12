package com.CampwithUs.service;

import java.time.LocalDate;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.CampwithUs.dto.PaymentDto;
import com.CampwithUs.custome_exception.ResourseNotFoundException;
import com.CampwithUs.entities.Payment;
import com.CampwithUs.repositories.PaymentRepository;
import com.CampwithUs.repositories.TripRepository;
import com.CampwithUs.repositories.UserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class PaymentServiceImpl implements PaymentService{
	
	@Autowired
	PaymentRepository paymentRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	TripRepository tripRepository;
	
	@Autowired
	ModelMapper mapper;

	@Override
	public List<Payment> getAllPayments() {
		return paymentRepository.findAll();
	}

	@Override
	public String addPaymet(PaymentDto dto) {
		Payment payment = mapper.map(dto, Payment.class);
		payment.setPaymentDate(LocalDate.now());
		payment.setUser(userRepository.findById(dto.getUserId()).orElseThrow());
		payment.setTrip(tripRepository.findById(dto.getTripId()).orElseThrow());
		paymentRepository.save(payment);
		return "Trip added successfully";
	}

	@Override
	public Payment getPaymetById(Long paymentId) throws ResourseNotFoundException {
		return paymentRepository.findById(paymentId).orElseThrow(() -> new ResourseNotFoundException("No payment found by such id"));
	}

}
