package com.CampwithUs.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.CampwithUs.custome_exception.ResourseNotFoundException;
import com.CampwithUs.dto.ApiResponse;
import com.CampwithUs.dto.ChangePasswordDto;
import com.CampwithUs.dto.CheckMailDto;
import com.CampwithUs.dto.SigninRequest;
import com.CampwithUs.dto.SigninResponse;
import com.CampwithUs.dto.UserAddDto;
import com.CampwithUs.entities.Role;
import com.CampwithUs.entities.Users;
import com.CampwithUs.repositories.UserRepository;
import com.CampwithUs.security.JwtUtils;
import com.CampwithUs.service.UserService;

import jakarta.validation.Valid;


@RestController
@RequestMapping("/validate")
@CrossOrigin(origins = "http://localhost:3000")
public class LoginController {
	
	@Autowired
    private JwtUtils jwtUtils;
	
		@Autowired
		UserService userService;


	    @Autowired
	    private AuthenticationManager authMgr;
	    
	    @Autowired
	    private UserRepository userRepository;

	
//	@PostMapping("/login")
//	public ResponseEntity<?> loginUser(@RequestBody LoginDto loginDto)
//	{
//		try {
//			String email = loginDto.getEmail();
//			String password = loginDto.getPassword();
//			Users user = userService.login(email, password);
//			return ResponseEntity.ok(user);
//		} catch (ResourseNotFoundException e) {
//			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
//		}
//	}
//	
	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody @Valid SigninRequest request)
	{
		System.out.println("User email is: "+request.getEmail());

        try {
            // 1. Create authentication token with email and password
            Authentication authentication = authMgr.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
            
            // 2. Fetch user details to get userId
            Users user = userRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // 3. Generate JWT token with userId
            String jwtToken = jwtUtils.generateJwtToken(authentication, user.getUserId());
            
            System.out.println("Authentication successful for: " + request.getEmail());

            return ResponseEntity.ok(new SigninResponse(jwtToken, "Successful Authentication!", user.getUserId()));

        } catch (AuthenticationException e) {
            System.out.println("Authentication failed: " + e.getMessage());	
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
	}
	
	@PostMapping("/adduser")
	public ResponseEntity<?> insertUser(@RequestBody UserAddDto user){
		Users add = userService.addUser(user);
		if(add != null) {
			return ResponseEntity.status(HttpStatus.CREATED).build();
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse("Unable to create User"));
	}
	
	@PostMapping("/checkemail")
	public ResponseEntity<?> validatingEmail(@RequestBody CheckMailDto dto){
		try {
			
			Users user = userService.validateEmail(dto.getEmail());
			System.out.println(user);
			return ResponseEntity.ok(user);
		} catch (ResourseNotFoundException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
	}
	
	@PutMapping("/changePassword")
	public ResponseEntity<?> updatePassword(@RequestBody ChangePasswordDto passDto){
		String email = passDto.getEmail();
		String password = passDto.getPassword();
		if(userService.modifyPassword(email, password)) {
			return ResponseEntity.ok("Password updated successfully");
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Enter valid password");
	}
	
}
