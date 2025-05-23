package com.studentmanagementsystem.springboot_studentdetails.util;

import java.time.LocalDateTime;
import java.util.List;

import com.studentmanagementsystem.springboot_studentdetails.dto.Course;

import lombok.Data;
@Data
public class ResponseStructureCourse<T> {
	private String msg;
	private int statusCode;
	private List<T> data;
	private LocalDateTime dateTime = LocalDateTime.now();
}
