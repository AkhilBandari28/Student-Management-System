package com.studentmanagementsystem.springboot_studentdetails.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Admin {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int aid;
	private String fname;
	private String lname;
	@Column(unique = true)
	private String email;
	private String password;
	private String address;
	private long mobileNumber;
}
