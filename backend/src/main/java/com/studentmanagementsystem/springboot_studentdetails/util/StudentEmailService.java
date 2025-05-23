package com.studentmanagementsystem.springboot_studentdetails.util;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import com.studentmanagementsystem.springboot_studentdetails.dto.Course;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Component
public class StudentEmailService {
	@Autowired
	private JavaMailSender mailSender;
	
	// Sending Email to particular recipients
	public void sendLoginEmail(String to, String userName) {
	    MimeMessage message = mailSender.createMimeMessage();

	    try {
	        MimeMessageHelper helper = new MimeMessageHelper(message, true);
	        helper.setTo(to);
	        helper.setSubject("✅ Login Confirmation - Student Management System");
	        helper.setFrom("akhi76875@gmail.com");

	        String htmlContent = "<!DOCTYPE html>" +
	                "<html>" +
	                "<head>" +
	                "  <style>" +
	                "    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f0f8ff; padding: 20px; }" +
	                "    .container { background-color: #ffffff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }" +
	                "    h2 { color: #2e86de; }" +
	                "    p { font-size: 16px; color: #555; line-height: 1.6; }" +
	                "    .success { color: green; font-weight: bold; font-size: 18px; }" +
	                "    .footer { margin-top: 40px; font-size: 14px; color: #888; text-align: center; }" +
	                "    .btn { display: inline-block; padding: 10px 20px; background-color: #2e86de; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }" +
	                "  </style>" +
	                "</head>" +
	                "<body>" +
	                "  <div class='container'>" +
	                "    <h2>🎉 Login Successful!</h2>" +
	                "    <p class='success'>You have successfully logged into the <strong>Student Management System</strong>.</p>" +
	                "    <p>Welcome back! You now have full access to the system’s dashboard, student records, reports, and more.</p>" +
	                "    <p>If you did not attempt this login, please reset your password immediately or contact support.</p>" +
	                "    <a href='https://yourdomain.com/dashboard' class='btn'>Go to Dashboard</a>" +
	                "    <div class='footer'>" +
	                "      <hr/>" +
	                "      <p>With ❤️ from Akhil Infotech Team<br/>" +
	                "      © 2025 Student Management System</p>" +
	                "    </div>" +
	                "  </div>" +
	                "</body>" +
	                "</html>";

	        helper.setText(htmlContent, true); // Enable HTML
	        mailSender.send(message);
	    } catch (MessagingException e) {
	        e.printStackTrace();
	        // Optionally log error or handle
	    }
	}

	
	// Send single HTML email
	public void sendHtmlEmail(String to, String userName) {
	    MimeMessage message = mailSender.createMimeMessage();
	    try {
	        MimeMessageHelper helper = new MimeMessageHelper(message, true);
	        helper.setTo(to);
	        helper.setSubject("🎓 Welcome to Student Management System ❤️");
	        helper.setFrom("akhi76875@gmail.com");

	        String htmlContent = "<!DOCTYPE html>" +
	                "<html>" +
	                "<head>" +
	                "  <style>" +
	                "    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9f9f9; padding: 20px; }" +
	                "    .container { max-width: 600px; background-color: #fff; padding: 30px; border-radius: 10px; box-shadow: 0 0 12px rgba(0,0,0,0.1); }" +
	                "    h2 { color: #2e86de; }" +
	                "    p { font-size: 16px; color: #333; line-height: 1.6; }" +
	                "    .feature-list { margin-top: 20px; }" +
	                "    .feature-list li { margin-bottom: 10px; font-size: 15px; }" +
	                "    .highlight { color: green; font-weight: bold; }" +
	                "    .footer { margin-top: 30px; font-size: 14px; color: #888; text-align: center; border-top: 1px solid #ddd; padding-top: 15px; }" +
	                "  </style>" +
	                "</head>" +
	                "<body>" +
	                "  <div class='container'>" +
	                "    <h2>👋 Hello " + userName + ",</h2>" +
	                "    <p>✅ Your registration to the <strong>Student Management System</strong> was <span class='highlight'>successful</span>!</p>" +
	                "    <p>We’re excited to have you with us. Here’s what you can do as a student:</p>" +
	                "    <ul class='feature-list'>" +
	                "      <li>📘 <strong>Add Courses:</strong> Choose from a wide range of subjects and enroll in new courses anytime.</li>" +
	                "      <li>👀 <strong>View Courses:</strong> See all your current enrolled courses and explore available ones.</li>" +
	                "      <li>❌ <strong>Delete Courses:</strong> Remove courses you're no longer interested in with ease.</li>" +
	                "      <li>🧑 <strong>Update Profile:</strong> Keep your profile information up-to-date.</li>" +
	                "      <li>📊 <strong>Track Progress:</strong> Monitor your academic performance and get detailed reports.</li>" +
	                "    </ul>" +
	                "    <p>If you have any questions, feel free to contact our support team anytime.</p>" +
	                "    <div class='footer'>" +
	                "      <p>© 2025 Akhil Infotech. All rights reserved.</p>" +
	                "    </div>" +
	                "  </div>" +
	                "</body>" +
	                "</html>";

	        helper.setText(htmlContent, true); // HTML enabled
	        mailSender.send(message);

	    } catch (MessagingException e) {
	        e.printStackTrace();
	        // You may log this or rethrow custom exception
	    }
	}

 
	public void sendHtmlEmailNew(String to, List<Course> list) {
	    MimeMessage message = mailSender.createMimeMessage();
	    try {
	        MimeMessageHelper helper = new MimeMessageHelper(message, true);
	        helper.setTo(to);
	        helper.setSubject("🎓 Welcome to Student Management System ❤️");
	        helper.setFrom("akhi76875@gmail.com");

	        // Build styled course list
	        StringBuilder courseListBuilder = new StringBuilder();
	        courseListBuilder.append("<div class='course-section'><h3>📚 Enrolled Courses</h3>");
	        for (Course course : list) {
	            courseListBuilder.append("<div class='course-card'>")
	                .append("<strong>").append(course.getName()).append("</strong><br>")
	                .append("Duration: ").append(course.getDuration()).append("<br>")
	                .append("Cost: ₹").append(course.getCost())
	                .append("</div>");
	        }
	        courseListBuilder.append("</div>");

	        String htmlContent = "<!DOCTYPE html>" +
	            "<html>" +
	            "<head>" +
	            "<style>" +
	            "body { font-family: 'Segoe UI', sans-serif; background-color: #f4f4f4; padding: 20px; }" +
	            ".container { max-width: 650px; margin: auto; background: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }" +
	            "h2 { color: #2c3e50; }" +
	            "p { color: #555; font-size: 16px; line-height: 1.6; }" +
	            ".course-section { margin-top: 20px; }" +
	            ".course-card { background-color: #e8f5e9; padding: 15px; border-left: 5px solid #4caf50; margin-bottom: 10px; border-radius: 8px; }" +
	            ".footer { margin-top: 30px; font-size: 14px; color: #999; text-align: center; border-top: 1px solid #ddd; padding-top: 10px; }" +
	            "</style>" +
	            "</head>" +
	            "<body>" +
	            "<div class='container'>" +
	            "<h2>👋 Hello " + to + ",</h2>" +
	            "<p>Welcome to the <strong>Student Management System</strong>! We’re thrilled to have you join us.</p>" +
	            "<p>You have been successfully enrolled in the following course(s):</p>" +
	            courseListBuilder.toString() +
	            "<p>With our system, you can:</p>" +
	            "<ul>" +
	            "<li>✅ Add new courses</li>" +
	            "<li>✅ View all enrolled courses</li>" +
	            "<li>✅ Delete unwanted courses</li>" +
	            "<li>✅ Update your student profile anytime</li>" +
	            "</ul>" +
	            "<p>Feel free to explore and manage your academic journey with ease.</p>" +
	            "<div class='footer'>© 2025 Akhil Infotech. All rights reserved.</div>" +
	            "</div>" +
	            "</body>" +
	            "</html>";

	        helper.setText(htmlContent, true); // HTML content
	        mailSender.send(message);
	    } catch (MessagingException e) {
	        e.printStackTrace();
	        // Optional: log or rethrow as custom exception
	    }
	}

    
}
