package com.CampwithUs.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserDto {
	private String name;
	
	private String bio;
	
	private String email;
	
	private String password;
	
	private String confirmPassword;
	
}
