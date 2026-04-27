package com.finalyear.publicpulse.service;

import com.finalyear.publicpulse.dto.LoginDto;
import com.finalyear.publicpulse.dto.OfficialRegisterDto;
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

import java.util.*;

@Service
public class OfficialsAuthService {
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
                if (!Objects.equals(users.getRole().getName(), "USER")) {

                    String token = jwtService.generateToken(authentication.getName());

                    Map<String, Object> response = new HashMap<>();
                    response.put("token", token);
                    users.setPassword(null);

                    response.put("user", users);

                    return ResponseEntity.ok(response);

                } else {
                    return ResponseEntity.status(402).body("Users are Not Allowed to Login Here");
                }
            }

        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(401).body("Invalid password");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Server Error");
        }
        return null;
    }

    public ResponseEntity<?> register(OfficialRegisterDto registerDto) {
        Users users = new Users();
        Roles roles = rolesRepo.findRolesByName("OFFICIAL");
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
        users.setTotalProblemAttempted(0L);
        users.setTotPoints(0L);
        users.setTotProblemSolved(0L);
        users.setTotProblemsReported(null);
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
