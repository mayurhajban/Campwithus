package com.CampwithUs.service;

import java.time.LocalDate;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.CampwithUs.custome_exception.ResourseNotFoundException;
import com.CampwithUs.dto.UserAddDto;
import com.CampwithUs.dto.UserDto;
import com.CampwithUs.repositories.UserRepository;
import com.CampwithUs.entities.Users;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class UserServiceImpl implements UserService{
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	ModelMapper mapper;
	
	
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public List<Users> getAllUsers() {
		List<Users> uList = userRepository.findAll();
		return uList;
	}

	@Override
	public Users getUserDetails(Long id) throws ResourseNotFoundException {
		if(userRepository.existsById(id)) {
			Users u = userRepository.findById(id).orElseThrow(() -> new ResourseNotFoundException("User Not found"));
			return u;
		}
		throw new ResourseNotFoundException("User Not Found");
	}

	@Override
	public Users addUser(UserAddDto obj) {
		Users user = mapper.map(obj, Users.class);
		user.setCreatedOn(LocalDate.now());
		user.setPassword(passwordEncoder.encode(obj.getPassword()));
		return userRepository.save(user);
	}

	@Override
	public Boolean update(Long id, UserDto userDto) throws ResourseNotFoundException {
		if(userRepository.existsById(id)) {
			Users myUser = userRepository.findById(id).orElseThrow();
			Users user = mapper.map(userDto, Users.class);
			user.setRole(myUser.getRole());	
			user.setUserId(id);
			user.setCreatedOn(myUser.getCreatedOn());
			user.setPassword(passwordEncoder.encode(userDto.getPassword()));
			userRepository.save(user);
			return true;
		}
		throw new ResourseNotFoundException("User Not Found");
	}

	@Override
	public Boolean delete(Long id) throws ResourseNotFoundException {
		if(userRepository.existsById(id)) {
			userRepository.deleteById(id);
			return true;
		}
		throw new ResourseNotFoundException("User Not Found");
	}

	@Override
	public Users login(String email, String password) throws ResourseNotFoundException {
		Users user = userRepository.findByEmailAndPassword(email, password);
		if(user != null)
			return user;
		throw new ResourseNotFoundException("Invalid email or password");
	}

	@Override
	public Users validateEmail(String email) throws ResourseNotFoundException {
		Users user = userRepository.findByEmail(email).orElse(null);
		if(user != null)
			return user;
		throw new ResourseNotFoundException("Invalid email");
	}

	@Override
	public Boolean modifyPassword(String email, String password) {
        Users user = userRepository.findByEmail(email).orElse(null);
        if (user != null) {
            String encryptedPassword = passwordEncoder.encode(password);
            userRepository.changePassword(email, encryptedPassword);
            return true;
        }
        return false;
    }

}
