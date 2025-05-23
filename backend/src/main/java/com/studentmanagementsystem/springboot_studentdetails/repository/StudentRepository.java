package com.studentmanagementsystem.springboot_studentdetails.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.studentmanagementsystem.springboot_studentdetails.dto.Student;

public interface StudentRepository extends JpaRepository<Student, Integer>{
	@Query("select s from Student s where s.email=?1")
	public Student login(String email);
}
