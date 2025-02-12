package com.CampwithUs.dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SearchByLocAndDateDto {
	
	String location;
	
	LocalDate startDate;

}
