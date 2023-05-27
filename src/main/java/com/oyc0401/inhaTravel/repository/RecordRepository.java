package com.oyc0401.inhaTravel.repository;

import com.oyc0401.inhaTravel.domain.Record;
import com.oyc0401.inhaTravel.domain.Stage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RecordRepository extends JpaRepository<Record, Long> {
    Optional<Record> findByUserIdAndStageId(Long userId, Long stageId);

    List<Record> findByStageIdOrderByMoveAsc(Long stageId);

    List<Record> findByUserId(Long userId);

    List<Record> findByStageId(Long stageId);

    void deleteByUserId(Long userId);
}
