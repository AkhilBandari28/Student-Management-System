package com.studentmanagementsystem.springboot_studentdetails.dao;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.studentmanagementsystem.springboot_studentdetails.dto.Admin;
import com.studentmanagementsystem.springboot_studentdetails.repository.AdminRespository;

@Repository
public class AdminDao {
	@Autowired
	private AdminRespository adminRespository;
	
	public Admin saveAdmin(Admin admin) {
		return adminRespository.save(admin);
	}
	public Admin login(String email) {
		return adminRespository.login(email);
	}
	public Optional<Admin> findAdmin(int aid){
		return adminRespository.findById(aid);
	}
	public Admin updateAdmin(Admin admin) {
		return adminRespository.save(admin);
	}
	public void deleteAdmin(int aid) {
		adminRespository.deleteById(aid);;
	}
}
