package com.studentmanagementsystem.springboot_studentdetails.util;

import java.time.LocalDateTime;

import lombok.Data;
@Data
public class ResponseStructure<T> {
	private String msg;
	private int statusCode;
	private T data;
	private LocalDateTime dateTime = LocalDateTime.now();
}
