package com.oyc0401.inhaTravel.repository;

import com.oyc0401.inhaTravel.domain.Stage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface StageRepository extends JpaRepository<Stage, Long> {
    @Query("SELECT CASE " +
            "   WHEN :move > e.star1 THEN 0 " +
            "   WHEN :move > e.star2 THEN 1 " +
            "   WHEN :move > e.star3 THEN 2 " +
            "   ELSE 3 " +
            "   END " +
            "FROM Stage e " +
            "WHERE e.id = :id")
    Integer getResultByIdAndMove(@Param("id") Long id, @Param("move") int move);

}
