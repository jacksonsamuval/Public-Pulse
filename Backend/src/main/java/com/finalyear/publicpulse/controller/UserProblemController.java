package com.finalyear.publicpulse.controller;

import com.finalyear.publicpulse.service.ProblemService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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

    @GetMapping("/getByProblemStatus")
    public ResponseEntity<?> getByProblemStatus(@RequestParam String status){
        try {
            return problemService.getByProblemStatus(status);
        } catch (Exception e){
            return ResponseEntity.status(400).body("server error");
        }
    }

    @GetMapping("/getByProblemStatusUser")
    public ResponseEntity<?> getByProblemStatusUsers(@RequestParam String status){
        try {
            return problemService.getByProblemStatusUsers(status);
        } catch (Exception e){
            return ResponseEntity.status(400).body("server error");
        }
    }

    @GetMapping("/getAllProblemForUser")
    public ResponseEntity<?> getAllProblemForUser(){
        try {
            return problemService.getAllProblemForUser();
        } catch (Exception e){
            return ResponseEntity.status(400).body("server error");
        }
    }

    @PostMapping("/reviewAndComplete")
    public ResponseEntity<?> reviewAndCompleteProblem(@RequestParam Integer id,
                                                      @RequestParam String userResponse,
                                                      @RequestParam Long rating
    ){
        try {
            return problemService.reviewAndCompleteProblem(id,userResponse,rating);
        } catch (Exception e){
            return ResponseEntity.status(400).body("server error");
        }
    }

    @GetMapping("/getAllPoliticians")
    public ResponseEntity<?> getAllPoliticians(){
        try {
            return problemService.getAllPoliticians();
        } catch (Exception e){
            return ResponseEntity.status(400).body("server error");
        }
    }
}
