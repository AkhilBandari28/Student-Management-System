package com.studentmanagementsystem.springboot_studentdetails.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.studentmanagementsystem.springboot_studentdetails.dto.Course;
import com.studentmanagementsystem.springboot_studentdetails.dto.Student;
import com.studentmanagementsystem.springboot_studentdetails.exception.IdNotFound;
import com.studentmanagementsystem.springboot_studentdetails.repository.CourseRepository;
import com.studentmanagementsystem.springboot_studentdetails.repository.StudentRepository;

@Repository
public class StudentDao {
	@Autowired
	private StudentRepository studentRepository;
	@Autowired
	private CourseRepository courseRepository;
	
	public Student saveStudent(Student student) {
		return studentRepository.save(student);
	}
	// Response Student Details ----
	public Student saveStudentDetails(Student student) {
		return studentRepository.save(student);
	}
	// Response Finding Student Details ----
	public Optional<Student> findStudent(int id) {
		return studentRepository.findById(id);
	}
//	public Optional<Student> findStudentById(int id) {
//		return studentRepository.findById(id);
//	}
	// Response Updating Student Details ----
	public Student updateStudent(Student student) {
		 return studentRepository.save(student);
	}
	
	public void deleteStudent(int id) {
		studentRepository.deleteById(id);
	}
	// Response Updating Student Details ----
	public Student updateImage(Student student) {
		Optional<Student> studentDB = studentRepository.findById(student.getId());
		if(studentDB != null) {
			studentRepository.save(student);
			return studentDB.get();
		}else {
			throw new IdNotFound("Id Not Found..!");
		}
	}
	public Student login(String email) {
		return studentRepository.login(email);
	}
	public Student addCourseToStudent(int sid, int cid) {
		Optional<Student> student = studentRepository.findById(sid);
		Optional<Course> course = courseRepository.findById(cid);
		if(student.isPresent() && course.isPresent()) {
			Student student1 = student.get();
			Course course1 = course.get();
			List<Course> listCourses = student1.getCourse();
			listCourses.add(course1);
			student1.setCourse(listCourses);
			studentRepository.save(student1);
			return student1;
		}else {
			return null;
		}	
	}
	public Student removeCourseFromStudent(int sid,int cid) {
		Optional<Student> student = studentRepository.findById(sid);
		Optional<Course> course = courseRepository.findById(cid);
		if(student.isPresent() && course.isPresent()) {
			Student student1 = student.get();
			Course course1 = course.get();
			List<Course> listCourses = student1.getCourse();
			listCourses.remove(course1);
			student1.setCourse(listCourses);
			studentRepository.save(student1);
			return student1;
		}else {
			return null;
		}
	}
	public List<Course> fetchCoursesFromStudent(int sid) {
		Optional<Student> student = studentRepository.findById(sid);
		if(student.isPresent()) {
			Student student1 = student.get();
			List<Course> listCourses = student1.getCourse();
			return listCourses;
		}
		return null;
	}
//	public Student deleteStudentById(int sid) {
//		Optional<Student> student = studentRepository.findById(sid);
//		if(student != null) {
//			List<Course> listCourses = student.get().getCourse();
//			listCourses
//		}
//	}
}
