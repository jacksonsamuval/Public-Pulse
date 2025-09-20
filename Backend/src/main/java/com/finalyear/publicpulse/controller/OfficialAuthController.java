package com.finalyear.publicpulse.controller;

import com.finalyear.publicpulse.dto.LoginDto;
import com.finalyear.publicpulse.dto.OfficialRegisterDto;
import com.finalyear.publicpulse.service.OfficialsAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth/officials")
public class OfficialAuthController {
    @Autowired
    private OfficialsAuthService officialsService;

    @GetMapping("/hello")
    public String sayHello(){
        System.out.println("Hello, Officials");
        return "Hello, Officials";
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginToSystem(@RequestBody LoginDto loginDto){
        return officialsService.login(loginDto);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody OfficialRegisterDto officialRegisterDto){
        try {
            return officialsService.register(officialRegisterDto);
        } catch (Exception e){
            return ResponseEntity.status(400).body("Server Error");
        }
    }

    @GetMapping("/getAllRoles")
    public ResponseEntity<?> getAllRoles(){
        try {
            return officialsService.getAllRoles();
        } catch (Exception e){
            return ResponseEntity.status(400).body("Server Error");
        }
    }
}