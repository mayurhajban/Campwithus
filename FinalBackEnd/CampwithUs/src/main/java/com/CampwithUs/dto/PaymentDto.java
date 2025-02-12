package com.CampwithUs.dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentDto {
	
	private double paidAmount;
	
	private long cardNo;
	
	private int cvv;
	
	private long contactNo;
	
	private LocalDate cardExpireDate;
	
	private Long userId;
	
	private Long tripId;
}

