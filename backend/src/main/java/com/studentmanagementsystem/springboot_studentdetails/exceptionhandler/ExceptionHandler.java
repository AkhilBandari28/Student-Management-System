package com.studentmanagementsystem.springboot_studentdetails.exceptionhandler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.studentmanagementsystem.springboot_studentdetails.exception.IdNotFound;
import com.studentmanagementsystem.springboot_studentdetails.exception.InvalidEmail;
import com.studentmanagementsystem.springboot_studentdetails.exception.InvalidIDAdmin;
import com.studentmanagementsystem.springboot_studentdetails.exception.NoUpdation;
import com.studentmanagementsystem.springboot_studentdetails.exception.NotPerformUpdation;
import com.studentmanagementsystem.springboot_studentdetails.util.ResponseStructure;

@RestControllerAdvice
public class ExceptionHandler {
	
	ResponseStructure<String> structure = new ResponseStructure<String>();
	@org.springframework.web.bind.annotation.ExceptionHandler(IdNotFound.class)
	public ResponseEntity<ResponseStructure<String>> idNotFound(IdNotFound notFound){
		structure.setMsg("Student Id Not Found..!!");
		structure.setData(notFound.getMessage());
		structure.setStatusCode(HttpStatus.NOT_FOUND.value());
		return new ResponseEntity<ResponseStructure<String>>(structure,HttpStatus.NOT_FOUND);
	}
	@org.springframework.web.bind.annotation.ExceptionHandler(NotPerformUpdation.class)
	public ResponseEntity<ResponseStructure<String>> idNotFound(NotPerformUpdation notPerformUpdation){
		structure.setMsg("Student Id Not Found..!!");
		structure.setData(notPerformUpdation.getMessage());
		structure.setStatusCode(HttpStatus.NOT_FOUND.value());
		return new ResponseEntity<ResponseStructure<String>>(structure,HttpStatus.NOT_FOUND);
	}
	@org.springframework.web.bind.annotation.ExceptionHandler(com.studentmanagementsystem.springboot_studentdetails.exception.InvalidPassword.class)
	public ResponseEntity<ResponseStructure<String>> invalidPassword(com.studentmanagementsystem.springboot_studentdetails.exception.InvalidPassword invalidPassword){
		structure.setMsg("Password Did't Match");
		structure.setData(invalidPassword.getMessage());
		structure.setStatusCode(HttpStatus.NOT_FOUND.value());
		return new ResponseEntity<ResponseStructure<String>>(structure,HttpStatus.NOT_FOUND);
	}
	public ResponseEntity<ResponseStructure<String>> invalidEmail(InvalidEmail invalidEmail){
		structure.setMsg("Email is Invalid..!!");
		structure.setData(invalidEmail.getMessage());
		structure.setStatusCode(HttpStatus.NOT_FOUND.value());
		return new ResponseEntity<ResponseStructure<String>>(structure,HttpStatus.NOT_FOUND);
	}
	
	// ADMIN SERVICE EXCEPTION -----------
	
	public ResponseEntity<ResponseStructure<String>> invalidIDAdmin(InvalidIDAdmin invalidIDAdmin ){
		structure.setMsg("Admin Id Not Found..!!");
		structure.setData(invalidIDAdmin.getMessage());
		structure.setStatusCode(HttpStatus.NOT_FOUND.value());
		return new ResponseEntity<ResponseStructure<String>>(structure,HttpStatus.NOT_FOUND);
	}
	
	public ResponseEntity<ResponseStructure<String>> noUpdation(NoUpdation noUpdation){
		structure.setMsg("Admin Id Not Found..!!");
		structure.setData(noUpdation.getMessage());
		structure.setStatusCode(HttpStatus.NOT_FOUND.value());
		return new ResponseEntity<ResponseStructure<String>>(structure,HttpStatus.NOT_FOUND);
	}
}
