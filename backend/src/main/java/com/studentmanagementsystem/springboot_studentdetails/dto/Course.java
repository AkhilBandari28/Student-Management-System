package com.studentmanagementsystem.springboot_studentdetails.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import lombok.Data;

@Entity
@Data
public class Course {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int cid;
	private String name;
	private double cost;
	private String duration;
	
	@ManyToMany(cascade = CascadeType.ALL,mappedBy = "course")
	@JsonIgnore
	private List<Student> student;
}
