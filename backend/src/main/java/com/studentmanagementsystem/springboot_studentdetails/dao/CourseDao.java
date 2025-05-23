package com.studentmanagementsystem.springboot_studentdetails.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.studentmanagementsystem.springboot_studentdetails.dto.Course;
import com.studentmanagementsystem.springboot_studentdetails.repository.CourseRepository;

@Repository
public class CourseDao {
	@Autowired
	private CourseRepository courseRepository;
	
	public List<Course> saveCourse(List<Course> course){
		List<Course> listCourses = new ArrayList<>();
		for (Course course2 : course) {
			listCourses.add(courseRepository.save(course2));
		}
		return listCourses;
	}
	
	public List<Course> getAllCourses(){
		return courseRepository.findAll();
	}
	
	public Optional<Course> findCourse(int cid) {
	    return courseRepository.findById(cid);
	}

	
	public void deleteCourse(int cid) {
	    courseRepository.deleteById(cid);
	}

}
