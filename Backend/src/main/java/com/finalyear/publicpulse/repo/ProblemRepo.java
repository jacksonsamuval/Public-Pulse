package com.finalyear.publicpulse.repo;

import com.finalyear.publicpulse.model.Problem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProblemRepo extends JpaRepository<Problem,Integer> {
}
