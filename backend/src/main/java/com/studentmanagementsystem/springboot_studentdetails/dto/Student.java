package com.studentmanagementsystem.springboot_studentdetails.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToMany;
import lombok.Data;

@Entity
@Data
public class Student {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String fname;
	private String lname;
	@Column(unique = true)
	private String email;
	private String password;
	private String address;
	private long mobileNumber;
	
	@Lob 			 // to consider as large object ----
	@Column(columnDefinition = "longblob", length = 999999999)   // size
	private byte img[];
	
	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(joinColumns = @JoinColumn(name = "id"),inverseJoinColumns = @JoinColumn(name = "cid"))
	@JsonIgnore
	private List<Course> course;
}
