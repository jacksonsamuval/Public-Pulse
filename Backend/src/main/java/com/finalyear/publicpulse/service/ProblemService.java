package com.finalyear.publicpulse.service;

import com.finalyear.publicpulse.config.UserPrincipal;
import com.finalyear.publicpulse.details.Status;
import com.finalyear.publicpulse.model.Problem;
import com.finalyear.publicpulse.model.Users;
import com.finalyear.publicpulse.repo.ProblemRepo;
import com.finalyear.publicpulse.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class ProblemService {
    @Autowired
    private ProblemRepo problemRepo;
    @Autowired
    private UserRepo userRepo;
    public ResponseEntity<?> submitProblem(String description,String address, String city,String pinCode, MultipartFile image) throws IOException {
        Users users = UserPrincipal.getCurrentUser();
        Problem problem = new Problem();
        problem.setUsers(users);
        problem.setDescription(description);
        problem.setCity(city);
        problem.setAddress(address);
        problem.setImage(image.getBytes());
        problem.setPincode(pinCode);
        problem.setTakenBy(null);
        problem.setOfficialResponse(null);
        problem.setRating(0L);
        problem.setUserResponse(null);
        users.setTotProblemsReported(users.getTotProblemsReported()+1);

        userRepo.save(users);
        Problem problem1 = problemRepo.save(problem);
        return ResponseEntity.status(200).body(problem1);
    }

    public ResponseEntity<?> getAllProblemInCity(String city) {
        List<Problem> problems = problemRepo.findByCity(city);
        return ResponseEntity.status(200).body(problems);
    }

    public ResponseEntity<?> solveProblem(Integer id, String problemResponse) {
        Optional<Problem> problemOpt = problemRepo.findById(id);
        if (problemOpt.isEmpty()) {
            return ResponseEntity.status(404).body("Problem not found");
        }

        Problem problem = problemOpt.get();
        Users currentUser = UserPrincipal.getCurrentUser();

        if ("USER".equalsIgnoreCase(currentUser.getRole().getName())) {
            return ResponseEntity.status(403).body("User Not Allowed to Solve Problem");
        }

        if (problem.getTakenBy() != null) {
            return ResponseEntity.status(409).body("Problem already taken");
        }

        problem.setTakenBy(currentUser);
        problem.setStatus(Status.PROGRESS);
        problem.setOfficialResponse(problemResponse);
        currentUser.setTotalProblemAttempted(currentUser.getTotalProblemAttempted() + 1);
        userRepo.save(currentUser);
        problemRepo.save(problem);

        return ResponseEntity.ok("Problem assigned successfully");
    }

    public ResponseEntity<?> getProblemTakenBy() {
        Users users =  UserPrincipal.getCurrentUser();
        List<Problem> problems = problemRepo.findUserByTakenBy(users);
        return ResponseEntity.status(200).body(problems);
    }

    public ResponseEntity<?> updateProblemStatus(Integer id) {
        Users users =  UserPrincipal.getCurrentUser();
        Optional<Problem> problem = problemRepo.findById(id);
        if (problem.get().getStatus()==Status.REVIEW_PENDING){
            return ResponseEntity.status(401).body("Already Updated");
        } else if (problem.get().getStatus()==Status.PROGRESS) {
            problem.get().setStatus(Status.REVIEW_PENDING);
            problemRepo.save(problem.get());
            return ResponseEntity.status(200).body("success");
        }
        return ResponseEntity.status(402).body("Not Yet Started");
    }

    public ResponseEntity<?> getByProblemStatus(String status) {
        Users users = UserPrincipal.getCurrentUser();
        Status status1 = Status.valueOf(status);
        List<Problem> problems = problemRepo.findByStatusAndTakenBy(status1,users);
        return ResponseEntity.status(200).body(problems);
    }

    public ResponseEntity<?> reviewAndCompleteProblem(Integer id, String userResponse, Long rating) {
        Users users = UserPrincipal.getCurrentUser();
        Optional<Problem> problem = problemRepo.findById(id);
        Status status = Status.REVIEW_PENDING;
        if (problem.get().getStatus()==status){
            problem.get().setUserResponse(userResponse);
            problem.get().setRating(rating);
            problem.get().setStatus(Status.COMPLETED);
            users.setTotProblemSolved(users.getTotProblemSolved()+1);
            Users official = problem.get().getTakenBy();

            official.setTotProblemSolved(official.getTotProblemSolved()+1);
            official.setTotPoints(official.getTotPoints()+rating);
            userRepo.save(users);
            userRepo.save(official);
            return ResponseEntity.status(200).body("Success");
        } else {
            return ResponseEntity.status(401).body("Problem is Still in Progress");
        }
    }
}
