package com.studentmanagementsystem.springboot_studentdetails.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.studentmanagementsystem.springboot_studentdetails.dto.Admin;
import com.studentmanagementsystem.springboot_studentdetails.service.AdminService;
import com.studentmanagementsystem.springboot_studentdetails.util.ResponseStructure;

@RestController
@CrossOrigin
public class AdminController {
	@Autowired
	private AdminService adminService;
	
	@PostMapping("/saveadmin")
	public ResponseEntity<ResponseStructure<Admin>> saveAdmin(@RequestBody Admin admin){
		return adminService.saveAdmin(admin);
	}
	@PostMapping("/admin/login")
	public ResponseEntity<ResponseStructure<Admin>> login(@RequestBody Admin admin){
		return adminService.login(admin);
	}
	@GetMapping("/findadmin/{aid}")
	public Optional<Admin> findAdmin(@PathVariable int aid){
		return adminService.findAdmin(aid);
	}
	@PutMapping("/updateadmin")
	public ResponseEntity<ResponseStructure<Admin>> updateAdmin(@RequestBody Admin admin){
		return adminService.updateAdmin(admin);
	}
	@DeleteMapping("/deleteadmin/{aid}")
	public ResponseEntity<ResponseStructure<Admin>> deleteAdmin(@PathVariable int aid){
		return adminService.deleteAdmin(aid);
	}
}
