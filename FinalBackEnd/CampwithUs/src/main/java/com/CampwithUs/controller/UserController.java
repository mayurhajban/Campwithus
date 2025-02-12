package com.CampwithUs.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.CampwithUs.custome_exception.ResourseNotFoundException;
import com.CampwithUs.dto.ApiResponse;
import com.CampwithUs.dto.UserDto;
import com.CampwithUs.entities.Users;
import com.CampwithUs.service.UserService;



@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

	@Autowired
	UserService userService;
	
	@GetMapping("/users")
	public ResponseEntity<?> getUser(){
		List<Users> li = userService.getAllUsers();
		if(li != null)
			return ResponseEntity.ok(li);
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse("User Not Found")); // to be corrected together !!!!!!!! Discuss it
	}
	
	@GetMapping("/userdetails/{id}")
	public ResponseEntity<?> getUserById(@PathVariable Long id){
		try {
			Users user = userService.getUserDetails(id);
			return ResponseEntity.ok(user);

		} catch (ResourseNotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage())); 
		}
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody UserDto user){
		try {
			userService.update(id, user);
			return ResponseEntity.ok(new ApiResponse("User successfully Updated"));
			
		} catch (ResourseNotFoundException e) {
			// TODO Auto-generated catch block
			return ResponseEntity.ok(new ApiResponse(e.getMessage()));
		}
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteUser(@PathVariable Long id){
		try {
			userService.delete(id);
			return ResponseEntity.ok(new ApiResponse("User successfully Deleted"));
			
		} catch (ResourseNotFoundException e) {
			// TODO Auto-generated catch block
			return ResponseEntity.ok(new ApiResponse(e.getMessage()));
		}
	}
	
	
}
