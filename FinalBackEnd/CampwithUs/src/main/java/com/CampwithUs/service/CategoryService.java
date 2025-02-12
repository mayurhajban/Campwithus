package com.CampwithUs.service;

import java.util.List;

import com.CampwithUs.custome_exception.ResourseNotFoundException;
import com.CampwithUs.entities.Category;

public interface CategoryService {
	
	public String addCategory(Category category);
	
	public List<Category> getAllCategory();
	
	public Category getCategory(Long id) throws ResourseNotFoundException;

}
