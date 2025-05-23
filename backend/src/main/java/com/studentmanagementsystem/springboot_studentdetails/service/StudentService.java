package com.studentmanagementsystem.springboot_studentdetails.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.studentmanagementsystem.springboot_studentdetails.dao.StudentDao;
import com.studentmanagementsystem.springboot_studentdetails.dto.Course;
import com.studentmanagementsystem.springboot_studentdetails.dto.Student;
import com.studentmanagementsystem.springboot_studentdetails.exception.IdNotFound;
import com.studentmanagementsystem.springboot_studentdetails.exception.InvalidEmail;
import com.studentmanagementsystem.springboot_studentdetails.exception.InvalidPassword;
import com.studentmanagementsystem.springboot_studentdetails.exception.NotPerformUpdation;
import com.studentmanagementsystem.springboot_studentdetails.util.ResponseStructure;
import com.studentmanagementsystem.springboot_studentdetails.util.StudentEmailService;

import jakarta.mail.Multipart;

@Service
public class StudentService {
	@Autowired
	private StudentDao studentDao;
	@Autowired
	private StudentEmailService studentEmailService;
	
	private ResponseStructure<Student> structure = new ResponseStructure<Student>();  // added private keyword
	
	public Student saveStudent(Student student) {
		return studentDao.saveStudent(student);
	}
	// Response Student Details ----
	public ResponseEntity<ResponseStructure<Student>> saveStudentDetails(Student student){
		structure.setMsg("Saved Successfully..!!");
		structure.setStatusCode(HttpStatus.OK.value());
		structure.setData(studentDao.saveStudentDetails(student));
//		studentEmailService.sendEmail(student.getEmail());
		studentEmailService.sendHtmlEmail(student.getEmail(), student.getFname());   // added ######
		return new ResponseEntity<ResponseStructure<Student>>(structure,HttpStatus.OK);
	}
	// Response Finding Student Details ----
	public Optional<Student> findStudent(int id) {
		Optional<Student> student = studentDao.findStudent(id);
		if(student.isPresent()) {
			return student;
		}else {
			throw new IdNotFound("Student Not Found. Try Again...!!!!");
		}
	}
	// Response Updating Student Details ----
	public ResponseEntity<ResponseStructure<Student>> updateStudent(Student student){
		Student studentDB = studentDao.updateStudent(student);
		if(studentDB!=null) {
			structure.setData(studentDB);
			structure.setMsg("Student Details Updated!!!");
			structure.setStatusCode(HttpStatus.ACCEPTED.value());
			return new ResponseEntity<ResponseStructure<Student>>(structure,HttpStatus.ACCEPTED);
		}else {
			throw new NotPerformUpdation("Not Updated. Try Again!!");
		}
	}
	
	public ResponseEntity<ResponseStructure<Student>> deleteStudent(int id){
		Optional<Student> student = studentDao.findStudent(id);
		if(student.isPresent()) {
			studentDao.deleteStudent(id);
			structure.setData(student.get());
			structure.setMsg("Deleted Studented!!!");
			structure.setStatusCode(HttpStatus.ACCEPTED.value());
			return new ResponseEntity<ResponseStructure<Student>>(structure,HttpStatus.ACCEPTED);
		}else {
			throw new IdNotFound("ID NOt Found.Not Perform Deletion!!");
		}
	}
	// Response Updating Image Student Details ----
	public ResponseEntity<ResponseStructure<Student>> updateImage(int id, MultipartFile file) throws IOException {
	    try {
	        Student studentDB = studentDao.findStudent(id).get();

	        studentDB.setId(id);
	        studentDB.setImg(file.getBytes());
	        structure.setMsg("Image Successfully Uploaded..!!");
	        structure.setStatusCode(HttpStatus.ACCEPTED.value());
	        structure.setData(studentDao.updateStudent(studentDB));
	        return new ResponseEntity<ResponseStructure<Student>>(structure, HttpStatus.ACCEPTED);

	    } catch (IdNotFound e) {
	        // Customizing the exception message
	        throw new IdNotFound("Image Is Not Uploaded...");
	    }
	}

//	public ResponseEntity<ResponseStructure<Student>> updateImage(int id,MultipartFile file) throws IOException{
//		Student studentDB = studentDao.findStudent(id).get(); // getting an error in this line
//		if(studentDB != null) {
//			studentDB.setId(id);
//			studentDB.setImg(file.getBytes());
//			structure.setMsg("Image Succesffully Uploaded..!!");
//			structure.setStatusCode(HttpStatus.ACCEPTED.value());
//			structure.setData(studentDao.updateStudent(studentDB));
//			return new ResponseEntity<ResponseStructure<Student>>(structure,HttpStatus.ACCEPTED);
//		}else {
//			throw new IdNotFound("Image Is Not Uploaded...");
//		}
//	}
	public ResponseEntity<ResponseStructure<Student>> login(Student student){
		Student studentDB = studentDao.login(student.getEmail());
		if(studentDB != null) {
			if(studentDB.getPassword().equals(student.getPassword())) {
				structure.setMsg("Login Successfully..!!");
				structure.setData(studentDB);
				structure.setStatusCode(HttpStatus.FOUND.value());
				studentEmailService.sendLoginEmail(student.getEmail(), student.getFname());
				return new ResponseEntity<ResponseStructure<Student>>(structure,HttpStatus.FOUND);
			}else {
				throw new InvalidPassword("Password Wrong...");
			}
		}else {
			throw new InvalidEmail("Email wrong...");
		}
	}
	
	//!!!-- Course --- Student
	public ResponseEntity<ResponseStructure<Student>> addCourseToStudent(int sid, int cid) {
		Student studentDB = studentDao.addCourseToStudent(sid, cid);
		if(studentDB != null) {
			structure.setData(studentDB);
			structure.setMsg("Courses Added Successfully...");
			structure.setStatusCode(HttpStatus.ACCEPTED.value());
			studentEmailService.sendHtmlEmailNew(studentDB.getEmail(), studentDB.getCourse());  // added new #######
			return new ResponseEntity<ResponseStructure<Student>>(structure,HttpStatus.ACCEPTED);
		}else {
			throw new IdNotFound("Id Not Founded..!!");
		}
	}
	public ResponseEntity<ResponseStructure<Student>> removeCourseFromStudent(int sid,int cid){
		Student studentDB = studentDao.removeCourseFromStudent(sid, cid);
		if(studentDB != null) {
			structure.setData(studentDB);
			structure.setMsg("Course Deleted...");
			structure.setStatusCode(HttpStatus.ACCEPTED.value());
			return new ResponseEntity<ResponseStructure<Student>>(structure,HttpStatus.ACCEPTED);
		}else {
			throw new IdNotFound("Id Not Founded..!!");
		}
	}
	public ResponseEntity<ResponseStructure<List<Course>>> fetchCoursesFromStudent(int sid){
		 Optional<Student> studentDB = studentDao.findStudent(sid); // getting error
		if(studentDB != null) {
			Student student1 = studentDB.get(); 
			ResponseStructure<List<Course>> listStructure = new ResponseStructure<List<Course>>();
			List<Course> listCourses = student1.getCourse();
			listStructure.setData(listCourses);
			listStructure.setMsg("Student All Courses are Fetched..");
			listStructure.setStatusCode(HttpStatus.FOUND.value());
			return new ResponseEntity<ResponseStructure<List<Course>>>(listStructure,HttpStatus.FOUND);
		}else {
			throw new IdNotFound("Student Not Found. Try Again..!!");
		}
	}
}
