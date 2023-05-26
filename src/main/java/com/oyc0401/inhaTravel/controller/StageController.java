package com.oyc0401.inhaTravel.controller;

import com.oyc0401.inhaTravel.domain.Stage;
import com.oyc0401.inhaTravel.service.StageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/stage")
public class StageController {

    private final StageService stageService;

    @Autowired
    public StageController(StageService stageService) {
        this.stageService = stageService;
    }

    @GetMapping()
    public ResponseEntity<Stage> getStage(@RequestParam("stage") int num) {
        Stage stage = stageService.getStage(num);
        return ResponseEntity.ok(stage);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addStage(@RequestBody Stage stage) {
        stageService.addStage(stage);
        return ResponseEntity.ok(stage.getNumber() + "번 스테이지가 추가되었습니다.");
    }

}
