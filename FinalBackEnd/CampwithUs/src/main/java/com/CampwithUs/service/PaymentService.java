package com.CampwithUs.service;

import java.util.List;

import com.CampwithUs.custome_exception.ResourseNotFoundException;
import com.CampwithUs.dto.PaymentDto;
import com.CampwithUs.entities.Payment;

public interface PaymentService {

	public List<Payment> getAllPayments();
	
	public String addPaymet(PaymentDto dto);
	
	public Payment getPaymetById(Long paymentId)  throws ResourseNotFoundException;
	
}
