package com.studentmanagementsystem.springboot_studentdetails.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Component
public class AdminEmailService {
	@Autowired
	private JavaMailSender mailSender;
	
	public void sendHtmlEmail(String to, String userName) {
	    MimeMessage message = mailSender.createMimeMessage();
	    try {
	        MimeMessageHelper helper = new MimeMessageHelper(message, true);
	        helper.setTo(to);
	        helper.setSubject("🎉 Welcome to Student Management System ❤️");
	        helper.setFrom("akhi76875@gmail.com");

	        String htmlContent = "<!DOCTYPE html>" +
	            "<html>" +
	            "<head>" +
	            "  <style>" +
	            "    body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }" +
	            "    .container { background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0,0,0,0.1); }" +
	            "    h2 { color: #2c3e50; }" +
	            "    p { color: #555; font-size: 16px; }" +
	            "    .footer { margin-top: 30px; font-size: 14px; color: #888; text-align: center; }" +
	            "    .highlight { color: green; font-weight: bold; }" +
	            "    .admin-note { background-color: #e0f7fa; padding: 10px; border-left: 4px solid #00acc1; margin-top: 20px; border-radius: 5px; }" +
	            "    table { width: 100%; border-collapse: collapse; margin-top: 20px; }" +
	            "    th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }" +
	            "    th { background-color: #00acc1; color: white; }" +
	            "    tr:nth-child(even) { background-color: #f2f2f2; }" +
	            "  </style>" +
	            "</head>" +
	            "<body>" +
	            "  <div class='container'>" +
	            "    <h2>👋 Hello " + userName + ",</h2>" +
	            "    <p>✅ Your registration to the <strong>Student Management System</strong> was <span class='highlight'>successful</span>!</p>" +
	            "    <p>We’re thrilled to have you on board. Now you can manage student data efficiently and securely.</p>" +

	            "    <div class='admin-note'>" +
	            "      <h3>👨‍💼 Admin Registration Details</h3>" +
	            "      <p>You have been successfully registered as an <strong>Admin</strong>. You now have access to all core functionalities including student management, reports, and user permissions.</p>" +
	            "    </div>" +

	            "    <h3 style='margin-top: 30px;'>📚 Available Courses</h3>" +
	            "    <table>" +
	            "      <tr>" +
	            "        <th>Course Name</th>" +
	            "        <th>Duration</th>" +
	            "        <th>Cost</th>" +
	            "      </tr>" +
	            "      <tr>" +
	            "        <td>Java Full Stack Development</td>" +
	            "        <td>6 Months</td>" +
	            "        <td>₹50,000</td>" +
	            "      </tr>" +
	            "      <tr>" +
	            "        <td>Python for Data Science</td>" +
	            "        <td>4 Months</td>" +
	            "        <td>₹35,000</td>" +
	            "      </tr>" +
	            "      <tr>" +
	            "        <td>Web Development (HTML/CSS/JS)</td>" +
	            "        <td>3 Months</td>" +
	            "        <td>₹25,000</td>" +
	            "      </tr>" +
	            "    </table>" +

	            "    <p style='margin-top: 25px;'>If you have any questions or need assistance, feel free to reach out to our support team.</p>" +

	            "    <div class='footer'>" +
	            "      <hr/>" +
	            "      <p>© 2025 Akhil Infotech. All rights reserved.</p>" +
	            "    </div>" +
	            "  </div>" +
	            "</body>" +
	            "</html>";

	        helper.setText(htmlContent, true); // Enable HTML
	        mailSender.send(message);
	    } catch (MessagingException e) {
	        e.printStackTrace();
	    }
	}

	// for login---------
	
	public void sendLoginSuccessEmail(String to, String userName) {
	    MimeMessage message = mailSender.createMimeMessage();

	    try {
	        MimeMessageHelper helper = new MimeMessageHelper(message, true);
	        helper.setTo(to);
	        helper.setSubject("✅ Login Successful - Student Management System");
	        helper.setFrom("akhi76875@gmail.com");

	        String htmlContent = "<!DOCTYPE html>" +
	            "<html>" +
	            "<head>" +
	            "  <style>" +
	            "    body { font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; }" +
	            "    .container { background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }" +
	            "    h2 { color: #2c3e50; }" +
	            "    p { font-size: 16px; color: #555; }" +
	            "    .login-note { background-color: #e8f5e9; padding: 15px; border-left: 4px solid #4caf50; border-radius: 5px; margin-top: 15px; }" +
	            "    .footer { margin-top: 30px; font-size: 14px; color: #999; text-align: center; }" +
	            "  </style>" +
	            "</head>" +
	            "<body>" +
	            "  <div class='container'>" +
	            "    <h2>👋 Welcome Back, " + userName + "!</h2>" +
	            "    <p>You have successfully logged in to the <strong>Student Management System</strong>.</p>" +
	            "    <div class='login-note'>" +
	            "      <p>Access your dashboard to view, edit, and manage student details, courses, and performance reports.</p>" +
	            "      <p>Stay organized and efficient with all your academic tasks in one place.</p>" +
	            "    </div>" +
	            "    <p>If this wasn't you, please reset your password or contact the system administrator immediately.</p>" +
	            "    <div class='footer'>" +
	            "      <hr/>" +
	            "      <p>© 2025 Akhil Infotech | Student Management System</p>" +
	            "    </div>" +
	            "  </div>" +
	            "</body>" +
	            "</html>";

	        helper.setText(htmlContent, true); // Enable HTML
	        mailSender.send(message);

	    } catch (MessagingException e) {
	        e.printStackTrace();
	        // Optionally log or rethrow as a custom exception
	    }
	}


}
