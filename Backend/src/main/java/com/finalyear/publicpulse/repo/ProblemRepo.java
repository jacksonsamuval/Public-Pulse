package com.finalyear.publicpulse.repo;

import com.finalyear.publicpulse.details.Status;
import com.finalyear.publicpulse.model.Problem;
import com.finalyear.publicpulse.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProblemRepo extends JpaRepository<Problem,Integer> {
    List<Problem> findByCity(String city);

    List<Problem> findUserByTakenBy(Users users);

    List<Problem> findByStatusAndUsers(Status status, Users users);

    List<Problem> findByStatusAndTakenBy(Status status, Users users);

    List<Problem> findByUsers(Users users);
}
