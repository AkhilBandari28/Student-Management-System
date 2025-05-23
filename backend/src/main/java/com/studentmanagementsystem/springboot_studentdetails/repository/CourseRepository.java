package com.studentmanagementsystem.springboot_studentdetails.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.studentmanagementsystem.springboot_studentdetails.dto.Course;

public interface CourseRepository extends JpaRepository<Course, Integer>{

}
