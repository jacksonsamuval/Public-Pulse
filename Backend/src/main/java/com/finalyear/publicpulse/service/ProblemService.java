package com.finalyear.publicpulse.service;

import com.finalyear.publicpulse.config.UserPrincipal;
import com.finalyear.publicpulse.model.Problem;
import com.finalyear.publicpulse.model.Users;
import com.finalyear.publicpulse.repo.ProblemRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.xml.crypto.Data;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Date;

@Service
public class ProblemService {
    @Autowired
    private ProblemRepo problemRepo;
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
        Problem problem1 = problemRepo.save(problem);
        return ResponseEntity.status(200).body(problem1);
    }
}
