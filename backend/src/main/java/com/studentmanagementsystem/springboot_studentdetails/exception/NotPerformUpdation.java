package com.studentmanagementsystem.springboot_studentdetails.exception;

public class NotPerformUpdation extends RuntimeException{
	public NotPerformUpdation(String msg) {
		super(msg);
	}
	@Override
	public String getMessage() {
		// TODO Auto-generated method stub
		return super.getMessage();
	}
}
