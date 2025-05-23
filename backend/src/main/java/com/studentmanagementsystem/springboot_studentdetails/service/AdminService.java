package com.studentmanagementsystem.springboot_studentdetails.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.studentmanagementsystem.springboot_studentdetails.dao.AdminDao;
import com.studentmanagementsystem.springboot_studentdetails.dto.Admin;
import com.studentmanagementsystem.springboot_studentdetails.exception.InvalidEmail;
import com.studentmanagementsystem.springboot_studentdetails.exception.InvalidIDAdmin;
import com.studentmanagementsystem.springboot_studentdetails.exception.InvalidPassword;
import com.studentmanagementsystem.springboot_studentdetails.exception.NoUpdation;
import com.studentmanagementsystem.springboot_studentdetails.exception.NotPerformUpdation;
import com.studentmanagementsystem.springboot_studentdetails.util.AdminEmailService;
import com.studentmanagementsystem.springboot_studentdetails.util.ResponseStructure;

@Service
public class AdminService {
	@Autowired
	private AdminDao adminDao;
	@Autowired
	private AdminEmailService adminEmailService;
	
	private ResponseStructure<Admin> structure = new ResponseStructure<Admin>();
	
	public ResponseEntity<ResponseStructure<Admin>> saveAdmin(Admin admin) {
		structure.setMsg("Saved Successfully..!!");
		structure.setData(adminDao.saveAdmin(admin));
		structure.setStatusCode(HttpStatus.OK.value());
		adminEmailService.sendHtmlEmail(admin.getEmail(), admin.getFname());
		return new ResponseEntity<ResponseStructure<Admin>>(structure,HttpStatus.OK);
	}
	public ResponseEntity<ResponseStructure<Admin>> login(Admin admin){
		Admin adminDB = adminDao.login(admin.getEmail());
		if(adminDB != null) {
			if(adminDB.getPassword().equals(admin.getPassword())) {
				structure.setMsg("Login Successfully..!!");
				structure.setData(adminDB);
				structure.setStatusCode(HttpStatus.FOUND.value());
				adminEmailService.sendLoginSuccessEmail(admin.getEmail(), admin.getFname());
				return new ResponseEntity<ResponseStructure<Admin>>(structure,HttpStatus.FOUND);
			}else {
				throw new InvalidPassword("Password Wrong. Try Again!!!");
			}
		}else {
			throw new InvalidEmail("Email Wrong. Try Again!!!");
		}
	}
	
	public Optional<Admin> findAdmin(int aid){
		Optional<Admin> admin1 = adminDao.findAdmin(aid);
		if(admin1.isPresent()) {
			return admin1;
		}else {
			throw new InvalidIDAdmin("Admin ID not found...!");
		}
	}
	
	public ResponseEntity<ResponseStructure<Admin>> updateAdmin(Admin admin){
		Admin adminDB = adminDao.updateAdmin(admin);
		if(adminDB!=null) {
			structure.setData(adminDB);
			structure.setMsg("Admin Details Updated!!!");
			structure.setStatusCode(HttpStatus.ACCEPTED.value());
			return new ResponseEntity<ResponseStructure<Admin>>(structure,HttpStatus.ACCEPTED);
		}else {
			throw new NoUpdation("Not Updated. Try Again!!");
		}
	}
	
	public ResponseEntity<ResponseStructure<Admin>> deleteAdmin(int aid){
		Optional<Admin> admin1 = adminDao.findAdmin(aid);
		if(admin1.isPresent()) {
			adminDao.deleteAdmin(aid);
			structure.setData(admin1.get());
			structure.setMsg("Admin Deleted..!!");
			structure.setStatusCode(HttpStatus.ACCEPTED.value());
			return new ResponseEntity<ResponseStructure<Admin>>(structure,HttpStatus.ACCEPTED);
		}else {
			throw new InvalidIDAdmin("Admin ID not found...!");
		}
	}
}
