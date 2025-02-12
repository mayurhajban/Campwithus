package com.CampwithUs.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.CampwithUs.repositories.CategoryRepository;
import com.CampwithUs.entities.Category;
import com.CampwithUs.custome_exception.ResourseNotFoundException;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class CategoryServiceImpl implements CategoryService{

	@Autowired
	CategoryRepository categoryRepository;
	
	@Override
	public String addCategory(Category category) {
		if(category != null) {
			categoryRepository.save(category);
			return "Category Added Successfully";
		}
		return "Inserting category failed";
	}

	@Override
	public List<Category> getAllCategory() {
		List<Category> categories = categoryRepository.findAll();
		return categories;
	}

	@Override
	public Category getCategory(Long id) throws ResourseNotFoundException {
		Category category = categoryRepository.findById(id).orElseThrow(() -> new ResourseNotFoundException("Category not found"));
		return category;
	}

}
