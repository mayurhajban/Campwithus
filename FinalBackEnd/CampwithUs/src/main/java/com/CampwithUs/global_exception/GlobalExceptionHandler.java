package com.CampwithUs.global_exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.CampwithUs.dto.ApiResponse;


@RestControllerAdvice
public class GlobalExceptionHandler {
	
//	@ExceptionHandler(AuthenticationException.class)
//	@ResponseStatus(value=HttpStatus.UNAUTHORIZED)
//	public ApiResponse handleAuthhenticationException()
	
	
	@ExceptionHandler(RuntimeException.class)
	@ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
	public ApiResponse handleAnyException(RuntimeException e) {
		System.out.println("in catch-all " + e);
		return new ApiResponse(e.getMessage());
	}

}
