package com.finalyear.publicpulse.service;

import com.finalyear.publicpulse.model.Roles;
import com.finalyear.publicpulse.repo.RolesRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RolesService {
    @Autowired
    private RolesRepo rolesRepo;
    public ResponseEntity<?> addRoles(Roles roles) {
        Roles roles1 = rolesRepo.findRolesByName(roles.getName());
        if (roles1 == null){
            Roles res = rolesRepo.save(roles);
            return ResponseEntity.status(200).body(res);
        } else {
            return ResponseEntity.status(401).body("Already Exists");
        }
    }

    public ResponseEntity<?> getAllRoles() {
        List<Roles> roles = rolesRepo.findAll();
        return ResponseEntity.status(200).body(roles);
    }
}
