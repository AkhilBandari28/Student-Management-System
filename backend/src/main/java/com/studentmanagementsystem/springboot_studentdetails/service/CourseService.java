package com.studentmanagementsystem.springboot_studentdetails.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.studentmanagementsystem.springboot_studentdetails.dao.CourseDao;
import com.studentmanagementsystem.springboot_studentdetails.dto.Course;
import com.studentmanagementsystem.springboot_studentdetails.exception.IdNotFound;
import com.studentmanagementsystem.springboot_studentdetails.util.ResponseStructure;
import com.studentmanagementsystem.springboot_studentdetails.util.ResponseStructureCourse;

@Service
public class CourseService {
	@Autowired
	private CourseDao courseDao;
	
	private ResponseStructureCourse<Course> structure = new ResponseStructureCourse<Course>();
	
	public ResponseEntity<ResponseStructureCourse<Course>> saveCourse(List<Course> course){
		List<Course> listCourse = courseDao.saveCourse(course);
		structure.setMsg("Courses Added Successfully..!!");  
		structure.setData(listCourse);
		structure.setStatusCode(HttpStatus.CREATED.value());
		return new ResponseEntity<ResponseStructureCourse<Course>>(structure,HttpStatus.CREATED);
	}
	
	public ResponseEntity<ResponseStructureCourse<Course>> getAllCourses(){
		List<Course> lisCourses = courseDao.getAllCourses();
		structure.setData(lisCourses);
		structure.setMsg("All courses fetched Successfully..!!");
		structure.setStatusCode(HttpStatus.OK.value());
		return new ResponseEntity<ResponseStructureCourse<Course>>(structure,HttpStatus.OK);
	}
	
	public ResponseEntity<ResponseStructure<Course>> deleteCourse(int cid) {
	    Optional<Course> course = courseDao.findCourse(cid);
	    if (course.isPresent()) {
	        courseDao.deleteCourse(cid);
	        ResponseStructure<Course> structure = new ResponseStructure<>();
	        structure.setData(course.get());
	        structure.setMsg("Deleted Course Successfully!!!");
	        structure.setStatusCode(HttpStatus.ACCEPTED.value());
	        return new ResponseEntity<ResponseStructure<Course>>(structure, HttpStatus.ACCEPTED);
	    } else {
	        throw new IdNotFound("ID Not Found. Cannot Perform Deletion!!");
	    }
	}


}
