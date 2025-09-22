package com.finalyear.publicpulse.controller;

import com.finalyear.publicpulse.service.ProblemService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/problem")
public class UserProblemController {
    @Autowired
    private ProblemService problemService;
    @PostMapping("/submitProblem")
    public ResponseEntity<?> submitProblem(@RequestParam("description") String description,
                                           @RequestParam("address") String address,
                                           @RequestParam("city") String city,
                                           @RequestParam("pincode") String pincode,
                                           @RequestParam("image") MultipartFile image,
                                           HttpServletRequest request) {
        try {
            return problemService.submitProblem(description,address,city,pincode,image);
        } catch (Exception e){
            return ResponseEntity.status(401).body("Server Error");
        }
    }

}
