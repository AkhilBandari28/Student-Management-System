package com.studentmanagementsystem.springboot_studentdetails.controller;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.studentmanagementsystem.springboot_studentdetails.dto.Course;
import com.studentmanagementsystem.springboot_studentdetails.dto.Student;
import com.studentmanagementsystem.springboot_studentdetails.service.StudentService;
import com.studentmanagementsystem.springboot_studentdetails.util.ResponseStructure;

@RestController
@CrossOrigin
public class StudentController {
	@Autowired
	private StudentService studentService;
	@PostMapping("/save")
	public Student saveStudent(@RequestBody Student student) {
		return studentService.saveStudent(student);
	}
	@PostMapping("/savestudent")
	public ResponseEntity<ResponseStructure<Student>> saveStudentDetails(@RequestBody Student student){
		return studentService.saveStudentDetails(student);
	}
	@PostMapping("/findstudent/{id}")
	public Optional<Student> findStudent(@PathVariable int id){
		return studentService.findStudent(id);
	}
	@PutMapping("/updatestudent")
	public ResponseEntity<ResponseStructure<Student>> updateStudent(@RequestBody Student student){
		return studentService.updateStudent(student);
	}
	@DeleteMapping("/deletestudent/{id}")
	public ResponseEntity<ResponseStructure<Student>> deleteStudent(@PathVariable int id){
		return studentService.deleteStudent(id);
	}
	@PostMapping("/uploadimage/{id}")
	public ResponseEntity<ResponseStructure<Student>> uploadImage(@PathVariable int id, @RequestParam MultipartFile file) throws IOException {
		return studentService.updateImage(id, file);
	}
	@GetMapping("/getimage/{id}")
	public ResponseEntity<byte[]> getImage(@PathVariable int id) {
		Student student = studentService.findStudent(id).get();
		byte[] image = student.getImg();

		return ResponseEntity.ok()
			.header("Content-Type", "image/jpeg") // Change to image/png if you're storing PNGs
			.body(image);
	}
	@PostMapping("/login")
	public ResponseEntity<ResponseStructure<Student>> login(@RequestBody Student student){
		return studentService.login(student);
	}
	@PostMapping("/addcourses/{sid}/{cid}")
	public ResponseEntity<ResponseStructure<Student>> addCourseToStudent(@PathVariable int sid,@PathVariable int cid) {
		return studentService.addCourseToStudent(sid, cid);
	}
	@PostMapping("/removecourse/{sid}/{cid}")
	public ResponseEntity<ResponseStructure<Student>> removeCourseFromStudent(@PathVariable int sid,@PathVariable int cid){
		return studentService.removeCourseFromStudent(sid, cid);
	}
	@GetMapping("/findstudentcourses/{sid}")
	public ResponseEntity<ResponseStructure<List<Course>>> fetchCoursesFromStudent(@PathVariable int sid){
		return studentService.fetchCoursesFromStudent(sid);
	}

}
