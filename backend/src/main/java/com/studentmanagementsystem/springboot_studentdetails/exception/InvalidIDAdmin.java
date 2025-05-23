package com.studentmanagementsystem.springboot_studentdetails.exception;

public class InvalidIDAdmin extends RuntimeException{
	public InvalidIDAdmin(String msg) {
		super(msg);
	}
	@Override
	public String getMessage() {
		// TODO Auto-generated method stub
		return super.getMessage();
	}
}
