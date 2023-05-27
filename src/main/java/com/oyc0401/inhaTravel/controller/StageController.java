package com.oyc0401.inhaTravel.controller;

import com.oyc0401.inhaTravel.domain.Record;
import com.oyc0401.inhaTravel.domain.Stage;
import com.oyc0401.inhaTravel.dto.DataResponse;
import com.oyc0401.inhaTravel.service.StageService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
        return ResponseEntity.ok(new DataResponse(stage.getId() + "번 스테이지가 추가되었습니다."));
    }

    @PostMapping("/clear")
    public ResponseEntity<?> clearStage(HttpServletRequest request, @RequestBody Record record) {
        HttpSession session = request.getSession();
        Long userId = (Long) session.getAttribute("userId");
        if (userId != null) {
            record.setUserId(userId);
            return ResponseEntity.ok(stageService.clear(record));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not logged in");
    }

    @GetMapping("/records")
    public ResponseEntity<?> clearStage() {
        return ResponseEntity.ok(stageService.allRecords());
    }

    @GetMapping("/record")
    public ResponseEntity<?> getRecords(@RequestParam("stage") Long id) {
        return ResponseEntity.ok(stageService.getRecords(id));
    }

    @GetMapping("/stages")
    public ResponseEntity<?> getMyStage(HttpServletRequest request) {
        HttpSession session = request.getSession();
        Long userId = (Long) session.getAttribute("userId");
        if (userId != null) {
            return ResponseEntity.ok(stageService.getMyStages(userId));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not logged in");
    }

    @GetMapping("/rank")
    public ResponseEntity<?> getUserRank() {
        return ResponseEntity.ok(stageService.getUserRank());
    }

    @GetMapping("/stageRank")
    public ResponseEntity<?> getStageRank(@RequestParam("stage") Long id) {
        return ResponseEntity.ok(stageService.getStageRank(id));
    }


}
