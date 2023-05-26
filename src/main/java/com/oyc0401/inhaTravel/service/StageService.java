package com.oyc0401.inhaTravel.service;


import com.oyc0401.inhaTravel.domain.Record;
import com.oyc0401.inhaTravel.domain.Stage;
import com.oyc0401.inhaTravel.repository.RecordRepository;
import com.oyc0401.inhaTravel.repository.StageRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class StageService {

    private final StageRepository stageRepository;
    private final RecordRepository recordRepository;

    @Autowired
    public StageService(StageRepository stageRepository, RecordRepository recordRepository) {
        this.stageRepository = stageRepository;
        this.recordRepository = recordRepository;
    }

    public Optional<Stage> getStage(Long id) {
        return stageRepository.findById(id);
    }

    public void addStage(Stage stage) {
        stageRepository.save(stage);
    }

    public void saveOrUpdateStage(Stage stage) {
        Long stageId = stage.getId();

        // ID 값이 존재하는 경우 데이터 업데이트
        Optional<Stage> existingStageOptional = stageRepository.findById(stageId);
        if (existingStageOptional.isPresent()) {
            Stage existingStage = existingStageOptional.get();
            // 업데이트할 필드들 설정
            existingStage.setStar1(stage.getStar1());
            existingStage.setStar2(stage.getStar2());
            existingStage.setStar3(stage.getStar3());
            existingStage.setMap(stage.getMap());

            // 업데이트된 엔티티 저장
            stageRepository.save(existingStage);
        } else {
            stageRepository.save(stage);
        }

    }

    @Transactional
    public int clear(Record record) {
        Optional<Record> existingRecordOptional = recordRepository.findByUserIdAndStageId(record.getUserId(), record.getStageId());
        if (existingRecordOptional.isPresent()) {
            Record existingRecord = existingRecordOptional.get();
            // 더 적게 움직인 기록으로 업데이트
            if (record.getMove() < existingRecord.getMove()) {
                existingRecord.setMove(record.getMove());
            }
        } else {
            recordRepository.save(record);
        }

        return calculateStar(record.getStageId(), record.getMove());
    }

    int calculateStar(Long stageId, int move) {
        return stageRepository.getResultByIdAndMove(stageId, move);
    }

    public List<Record> allRecords() {
        return recordRepository.findAll();
    }

}
