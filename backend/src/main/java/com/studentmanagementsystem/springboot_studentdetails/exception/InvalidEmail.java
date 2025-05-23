package com.studentmanagementsystem.springboot_studentdetails.exception;

public class InvalidEmail extends RuntimeException{
	public InvalidEmail(String msg) {
		super(msg);
	}
	@Override
	public String getMessage() {
		// TODO Auto-generated method stub
		return super.getMessage();
	}
}
