package com.finalyear.publicpulse.controller;

import com.finalyear.publicpulse.dto.LoginDto;
import com.finalyear.publicpulse.dto.UserRegisterDto;
import com.finalyear.publicpulse.jwt.JwtService;
import com.finalyear.publicpulse.service.UserAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth/user")
@CrossOrigin(origins = "*")
public class UserAuthController {
    @Autowired
    private UserAuthService userAuthService;
    @Autowired
    private JwtService jwtService;
    @GetMapping("/hello")
    public String sayHello(){
        System.out.println("Hello, Users");
        return "Hello, Users";
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginToSystem(@RequestBody LoginDto loginDto){
        return userAuthService.login(loginDto);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserRegisterDto registerDto){
        try {
            return userAuthService.register(registerDto);
        } catch (Exception e){
            return ResponseEntity.status(400).body("Server Error");
        }
    }

    @GetMapping("/valid")
    public ResponseEntity<?> valid(@RequestHeader("Authorization") String authHeader) {
        try {
            String token = authHeader.startsWith("Bearer ") ? authHeader.substring(7) : authHeader;

            boolean isValid = !jwtService.isTokenExpired(token);
            return ResponseEntity.ok(isValid);
        } catch (io.jsonwebtoken.ExpiredJwtException e) {
            return ResponseEntity.status(401).body(false);
        } catch (io.jsonwebtoken.MalformedJwtException e) {
            return ResponseEntity.status(400).body("Invalid token format");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Server Error: " + e.getMessage());
        }
    }

}
