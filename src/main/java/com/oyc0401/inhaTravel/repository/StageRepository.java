package com.oyc0401.inhaTravel.repository;

import com.oyc0401.inhaTravel.domain.Stage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StageRepository extends JpaRepository<Stage, Long> {
    Stage findByNumber(int number);
}
