package com.CampwithUs.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class TripDto {
	
	private String locationName;
	
	private String tripDescription;
	
	private LocalDate startDate;
	
	private LocalDate endDate;
	
	private double budget;
	
	private int noOfCompanion;
	
	private Long categoryId;
	
	private Long userId;
	
	
}
