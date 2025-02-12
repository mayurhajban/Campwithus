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
import jakarta.persistence.OneToOne;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Payment {
	
	@Id
	@Column(name = "payment_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long paymentId;
	
	@Column(name="payment_date")
	@CreationTimestamp
	private LocalDate paymentDate;
	
	@Column(name="amount")
	private double paidAmount;
	
	@Column(name = "card_no")
	private long cardNo;
	
	@Transient
	private int cvv;
	
	@Column(name = "contact_no")
	private long contactNo;
	
	@Column(name = "card_expire_date")
	private LocalDate cardExpireDate;
	
	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private Users user;
	
	@ManyToOne
	@JoinColumn(name = "trip_id", nullable = false)
	private Trip trip;
	
}
