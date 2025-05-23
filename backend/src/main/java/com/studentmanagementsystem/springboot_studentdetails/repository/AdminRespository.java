package com.studentmanagementsystem.springboot_studentdetails.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.studentmanagementsystem.springboot_studentdetails.dto.Admin;

public interface AdminRespository extends JpaRepository<Admin, Integer>{
	@Query("select a from Admin a where a.email=?1")
	public Admin login(String email);
}
