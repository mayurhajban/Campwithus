package com.CampwithUs.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.CampwithUs.entities.Users;

import jakarta.transaction.Transactional;




@Repository
public interface UserRepository extends JpaRepository<Users, Long>{
	
	Users findByEmailAndPassword(String email, String password);
	
	Optional<Users> findByEmail(String email);
	
	@Transactional
	@Modifying
	@Query("update Users u set u.password=:password where u.email=:email")
	int changePassword(String email, String password);

}
