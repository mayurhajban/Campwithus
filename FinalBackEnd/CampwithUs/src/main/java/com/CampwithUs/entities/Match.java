package com.CampwithUs.entities;

import java.time.LocalDate;

import org.hibernate.annotations.CreationTimestamp;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "matches")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Match {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "match_id")
	private Long matchId;
	
	@ManyToOne
	@JoinColumn(name = "trip_id", nullable = false)
	private Trip trip;
	
	@ManyToOne
	@JoinColumn(name="user_id", nullable = false)
	private Users user;
	
	@Column(name = "match_date")
	@CreationTimestamp
	private LocalDate matchDate;
	
}
