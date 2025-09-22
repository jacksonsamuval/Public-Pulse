package com.finalyear.publicpulse.service;

import com.finalyear.publicpulse.config.UserPrincipal;
import com.finalyear.publicpulse.model.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ProblemService {
    @Autowired
    private UserPrincipal userPrincipal;

//    public ResponseEntity<?> submitProblem(String description,String address, String city,String pinCode, MultipartFile image) {
//        Users users = userPrincipal.getCurrentUser();
//    }
}
