package com.oyc0401.inhaTravel.controller;

import com.oyc0401.inhaTravel.domain.Record;
import com.oyc0401.inhaTravel.domain.Stage;
import com.oyc0401.inhaTravel.service.StageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/stage")
public class StageController {

    private final StageService stageService;

    @Autowired
    public StageController(StageService stageService) {
        this.stageService = stageService;
    }

    @GetMapping()
    public ResponseEntity<?> getStage(@RequestParam("stage") Long id) {
        Optional<Stage> stage = stageService.getStage(id);
        if (stage.isPresent()) {
            return ResponseEntity.ok(stage.get());
        } else {
            return (ResponseEntity<?>) ResponseEntity.noContent();
        }


    }

    @PostMapping("/add")
    public ResponseEntity<?> addStage(@RequestBody Stage stage) {
        stageService.saveOrUpdateStage(stage);
        return ResponseEntity.ok(stage.getId() + "번 스테이지가 추가되었습니다.");
    }

    @PostMapping("/clear")
    public ResponseEntity<?> clearStage(@RequestBody Record record) {
        return ResponseEntity.ok(stageService.clear(record));
    }

    @GetMapping("/records")
    public ResponseEntity<?> clearStage() {
        return ResponseEntity.ok(stageService.allRecords());
    }


}
