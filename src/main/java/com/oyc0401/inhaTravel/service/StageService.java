package com.oyc0401.inhaTravel.service;


import com.oyc0401.inhaTravel.domain.Stage;
import com.oyc0401.inhaTravel.repository.StageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StageService {

    private final StageRepository stageRepository;

    @Autowired
    public StageService(StageRepository stageRepository) {
        this.stageRepository = stageRepository;
    }

    public Stage getStage(int number) {
        return stageRepository.findByNumber(number);
    }

    public void addStage(Stage stage) {
        stageRepository.save(stage);
    }
}
