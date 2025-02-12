package com.CampwithUs.entities;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "trip")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Trip {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "trip_id")
	private Long tripId;
	
	@Column(name="location_name" ,length = 20)
	private String locationName;

	@Column(name="description", length = 150, nullable = false)
	private String tripDescription;
	
	@Column(name="start_date", nullable = false)
	private LocalDate startDate;
	 
	@Column(name="end_date", nullable = false)
	private LocalDate endDate;
	
	@Column(nullable = false)
	private double budget;
	
	@Column(name = "no_of_companion", nullable = false)
	private int noOfCompanion;
	
	//For association
	@ManyToOne
	@JoinColumn(name="category_id", nullable = false)
	@ToString.Exclude
	@JsonIgnore
	private Category tripCategory;
	
	@ManyToOne
	@JoinColumn(name="user_id", nullable = false)
	@ToString.Exclude
	@JsonIgnore
	private Users user;
	
	@OneToMany(mappedBy = "trip", cascade = CascadeType.ALL, orphanRemoval = true)
	@ToString.Exclude
	@JsonIgnore
	List<Match> matches = new ArrayList<>();
	
	public Trip(String tripDescription, LocalDate startDate, LocalDate endDate, double budget) {
		super();
		this.tripDescription = tripDescription;
		this.startDate = startDate;
		this.endDate = endDate;
		this.budget = budget;
	}
	
	
	public void addMatch(Match match) {
        matches.add(match);
        match.setTrip(this); // Set the trip for the match
    }

    public void removeMatch(Match match) {
        matches.remove(match);
        match.setTrip(null); // Remove the trip from the match
    }
}
