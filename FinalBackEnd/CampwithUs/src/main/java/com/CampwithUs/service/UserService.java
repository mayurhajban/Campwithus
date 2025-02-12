package com.CampwithUs.service;

import java.util.List;

import com.CampwithUs.custome_exception.ResourseNotFoundException;
import com.CampwithUs.dto.UserAddDto;
import com.CampwithUs.dto.UserDto;
import com.CampwithUs.entities.Users;


public interface UserService {
	
	List<Users> getAllUsers();
	
	Users getUserDetails(Long id) throws ResourseNotFoundException;
	
	Users addUser(UserAddDto obj);
	
	Boolean update(Long id, UserDto user) throws ResourseNotFoundException;
	
	Boolean delete(Long id)  throws ResourseNotFoundException;
	
	Users login(String email, String password)  throws ResourseNotFoundException;
	
	Users validateEmail(String email) throws ResourseNotFoundException;
	
	Boolean modifyPassword(String email, String password);

}