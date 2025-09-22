package com.finalyear.publicpulse.repo;

import com.finalyear.publicpulse.model.Roles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RolesRepo extends JpaRepository<Roles,Integer> {

    Roles findRolesByName(String name);
}
