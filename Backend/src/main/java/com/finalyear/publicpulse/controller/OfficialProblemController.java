package com.finalyear.publicpulse.controller;

import com.finalyear.publicpulse.service.ProblemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/minister")
public class OfficialProblemController {
    @Autowired
    private ProblemService problemService;
    @GetMapping("/getProblemByCity")
    public ResponseEntity<?> getProblemByCity(@RequestParam String city){
        try {
            return problemService.getAllProblemInCity(city);
        } catch (Exception e){
            return ResponseEntity.status(400).body("server error");
        }
    }

    @GetMapping("/getAllProblemAvailaible")
    public ResponseEntity<?> getAllProblemAvailaible(){
        try {
            return problemService.getAllProblemAvailaible();
        } catch (Exception e){
            return ResponseEntity.status(400).body("server error");
        }
    }

    @GetMapping("/solveProblem")
    public ResponseEntity<?> solveProblem(@RequestParam Integer id,@RequestParam String problemResponse){
        try {
            return problemService.solveProblem(id,problemResponse);
        } catch (Exception e){
            return ResponseEntity.status(400).body("server error");
        }
    }
    @GetMapping("/getProblemByOfficial")
    public ResponseEntity<?> getProblemTakenBy(){
        try {
            return problemService.getProblemTakenBy();
        } catch (Exception e){
            return ResponseEntity.status(400).body("server error");
        }
    }
    @PostMapping("/updateProblemStatus")
    public ResponseEntity<?> updateProblemStatus(@RequestParam Integer id){
        try {
            return problemService.updateProblemStatus(id);
        } catch (Exception e){
            return ResponseEntity.status(400).body("server error");
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
}
