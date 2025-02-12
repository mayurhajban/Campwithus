package com.CampwithUs.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.CampwithUs.custome_exception.ResourseNotFoundException;
import com.CampwithUs.entities.Category;
import com.CampwithUs.service.CategoryService;



@RestController
@RequestMapping("/category")
@CrossOrigin(origins = "http://localhost:3000")
public class CategoryController {
	
	@Autowired
	CategoryService categoryService;
	
	@PostMapping("/addcategory")
	ResponseEntity<?> insertCategory(@RequestBody Category categroy){
		return ResponseEntity.status(HttpStatus.CREATED).body(categoryService.addCategory(categroy));
	}
	
	@GetMapping("/getcategory/{id}")
	ResponseEntity<?> singleCategory(@PathVariable Long id){
		try {
			return ResponseEntity.ok(categoryService.getCategory(id));
		} catch (ResourseNotFoundException e) {
			// TODO Auto-generated catch block
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
	}
	
	@GetMapping("/categories")
	ResponseEntity<?> allCategories(){
		return ResponseEntity.ok(categoryService.getAllCategory());
	}

}
