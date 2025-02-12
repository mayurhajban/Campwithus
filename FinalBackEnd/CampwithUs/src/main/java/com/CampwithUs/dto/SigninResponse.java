package com.CampwithUs.dto;

import com.CampwithUs.entities.Role;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SigninResponse {
	private String jwt;
	private String mesg;
	private Long userId;
}
