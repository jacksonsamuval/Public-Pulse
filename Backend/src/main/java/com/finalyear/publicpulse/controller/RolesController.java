package com.finalyear.publicpulse.controller;

import com.finalyear.publicpulse.model.Roles;
import com.finalyear.publicpulse.service.RolesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/role")
public class RolesController {
    @Autowired
    private RolesService rolesService;
    @PostMapping("/addRoles")
    public ResponseEntity<?> addRoles(@RequestBody Roles roles){
        try{
            return rolesService.addRoles(roles);
        }catch (Exception e){
            return ResponseEntity.status(400).body("Server Error");
        }
    }
    @GetMapping("/getAllRoles")
    public ResponseEntity<?> getAllRoles(){
        try{
            return rolesService.getAllRoles();
        }catch (Exception e){
            return ResponseEntity.status(400).body("Server Error");
        }
    }
}
