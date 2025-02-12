package com.CampwithUs.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.CampwithUs.entities.Users;
import com.CampwithUs.repositories.UserRepository;
import com.CampwithUs.custome_exception.ResourseNotFoundException;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
	
	private UserRepository userEntityRepository;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Users user = userEntityRepository.findByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException("User not found"));
		return new CustomUserDetails(user);
	}

}
