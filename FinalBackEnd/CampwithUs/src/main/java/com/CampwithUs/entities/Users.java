package com.CampwithUs.entities;

import java.time.LocalDate;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "user")
@Getter
@Setter
@NoArgsConstructor
@ToString

public class Users {
	@Id
	@Column(name = "user_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long userId;
	
	@Column(length = 30, nullable = false)
	private String name;
	
	@Column(length = 100)
	private String bio;
	
	@Column(length = 30, nullable = false)
	private String email;
	
	@Column(length = 225, nullable = false)
	private String password;
	
	@Transient
	@Column(length = 225, nullable = false)
	private String confirmPassword;
	
	@Enumerated(EnumType.STRING)
	private Role role;
	
	@CreationTimestamp
	@Column(name = "created_on", nullable = false)
	private LocalDate createdOn;

	public Users(String name, String bio, String email, String password, String confirmPassword, Role role) {
		super();
		this.name = name;
		this.bio = bio;
		this.email = email;
		this.password = password;
		this.confirmPassword = confirmPassword;
		this.role = role;
	}
	
	
	
}


