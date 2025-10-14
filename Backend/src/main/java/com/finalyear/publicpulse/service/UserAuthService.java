package com.finalyear.publicpulse.service;

import com.finalyear.publicpulse.dto.LoginDto;
import com.finalyear.publicpulse.dto.UserRegisterDto;
import com.finalyear.publicpulse.jwt.JwtService;
import com.finalyear.publicpulse.model.Roles;
import com.finalyear.publicpulse.model.Users;
import com.finalyear.publicpulse.repo.RolesRepo;
import com.finalyear.publicpulse.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class UserAuthService {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private RolesRepo rolesRepo;

    @Autowired
    private UserRepo userRepo;
    public ResponseEntity<?> login(LoginDto loginDto) {
        Users users = userRepo.findUsersByUsername(loginDto.getUsername());
        if (users == null) {
            return ResponseEntity.status(404).body("Username not found");
        }
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword())
            );

            if (authentication.isAuthenticated()) {
                String token = jwtService.generateToken(authentication.getName());
                Map<String, String> response = new HashMap<>();
                response.put("token", token);
                response.put("message", "Login successful");

                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(401).body("Invalid password");
            }
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(401).body("Invalid password");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Server Error");
        }
    }

    public ResponseEntity<?> register(UserRegisterDto registerDto) {
        Users users = new Users();
        Roles roles = rolesRepo.findRolesByName("USER");
        users.setRole(roles);
        users.setAge(registerDto.getAge());
        users.setUsername(registerDto.getUsername());
        users.setEmail(registerDto.getEmail());
        users.setName(registerDto.getName());
        users.setPassword(registerDto.getPassword());
        users.setMobileNo(registerDto.getMobileNo());
        users.setAddress(registerDto.getAddress());
        users.setCity(registerDto.getCity());
        users.setState(registerDto.getState());
        users.setTaluk(registerDto.getTaluk());
        users.setDistrict(registerDto.getDistrict());
        users.setCountry(registerDto.getCountry());
        users.setPinCode(registerDto.getPinCode());
        users.setTotalProblemAttempted(null);
        users.setTotPoints(null);
        users.setTotProblemSolved(0L);
        users.setTotProblemsReported(0L);
        if (userRepo.findUserByEmail(users.getEmail()).isPresent()){
            return ResponseEntity.status(401).body("Email Exists");
        }
        if (userRepo.findUserByUsername(users.getUsername()).isPresent()){
            return ResponseEntity.status(402).body("Username Exists");
        }
        if (userRepo.findUserByMobileNo(users.getMobileNo()).isPresent()){
            return ResponseEntity.status(403).body("Phone Number Exists");
        }
        if (users.getPassword().length() < 8){
            return ResponseEntity.status(404).body("Password Should be least 8 Characters");
        }
        Users users1 = userRepo.save(users);
        return ResponseEntity.status(200).body(users1);
    }
}
