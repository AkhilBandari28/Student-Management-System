package com.studentmanagementsystem.springboot_studentdetails.exception;

public class IdNotFound extends RuntimeException{
	public IdNotFound(String msg) {
		super(msg);
	}
	@Override
	public String getMessage() {
		// TODO Auto-generated method stub
		return super.getMessage();
	}
}
