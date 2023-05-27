package com.oyc0401.inhaTravel.service;


import com.oyc0401.inhaTravel.domain.Record;
import com.oyc0401.inhaTravel.domain.Stage;
import com.oyc0401.inhaTravel.domain.User;
import com.oyc0401.inhaTravel.dto.Rank;
import com.oyc0401.inhaTravel.dto.StageInformation;
import com.oyc0401.inhaTravel.repository.RecordRepository;
import com.oyc0401.inhaTravel.repository.StageRepository;

import com.oyc0401.inhaTravel.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Comparator;
import java.util.Optional;

@Service
public class StageService {

    private final StageRepository stageRepository;
    private final RecordRepository recordRepository;
    private final UserRepository userRepository;

    @Autowired
    public StageService(StageRepository stageRepository, RecordRepository recordRepository, UserRepository userRepository) {
        this.stageRepository = stageRepository;
        this.recordRepository = recordRepository;
        this.userRepository = userRepository;
    }

    // 스테이지를 추가한다.
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

    // 스테이지를 가져온다.
    public Optional<Stage> getStage(Long id) {
        return stageRepository.findById(id);
    }


    // 기록을 통해 클리어 처리를 한다.
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

    // 이동횟수를 통해 별을 몇개 얻었는지 알려준다.
    private int calculateStar(Long stageId, int move) {
        return stageRepository.getResultByIdAndMove(stageId, move);
    }

    // 모든 클리어 기록을 가져온다
    public List<Record> allRecords() {
        return recordRepository.findAll();
    }

    // 특정 스테이지의 기록을 가져온다.
    public List<Record> getRecords(Long stageId) {
        return recordRepository.findByStageIdOrderByMoveAsc(stageId);
    }

    // 내가 플레이 가능한 맵들을 보여준다.
    // 클리어했다면 내 점수도 보여준다.
    public List<StageInformation> getMyStages(Long userId) {
        List<Record> records = recordRepository.findByUserId(userId);
        int clearCount = records.size();

        List<Stage> stages = stageRepository.findAll();
        int stageCount = stages.size();

        List<StageInformation> infoList = new ArrayList<>(stageCount);

        for (int i = 0; i < stageCount; i++) {
            StageInformation information = new StageInformation();
            information.setStage(stages.get(i));
            if (i < clearCount) {
                information.setRecord(records.get(i));
                information.setClear(true);
            }
            infoList.add(information);
        }

        return infoList;
    }

    public List<Rank> getStageRank(Long stageId) {
        List<Record> records = recordRepository.findByStageId(stageId);
        List<Rank> ranks = new ArrayList<>();

        for (int i = 0; i < records.size(); i++) {
            Record record = records.get(i);
            Optional<User> userOptional = userRepository.findById(record.getUserId());
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                int star = calculateStar(record.getStageId(), record.getMove());

                Rank rank = new Rank();
                rank.setStar(star);
                rank.setMove(record.getMove());
                rank.setUsername(user.getUsername());
                rank.setNickname(user.getNickname());
                ranks.add(rank);
            }
        }

        // star 값으로 내림차순 정렬
        ranks.sort(Comparator.comparingInt(Rank::getStar).reversed());

        // star 값이 같은 경우 move 값으로 오름차순 정렬
        ranks.sort(Comparator.comparingInt(Rank::getMove));

        return ranks;
    }

    // 유저 랭킹을 보여준다.
    public List<Rank> getUserRank() {
        // 모든 유저를 가져온다.
        List<User> users = userRepository.findAll();
        List<Rank> ranks = new ArrayList<>();
        for (int i = 0; i < users.size(); i++) {
            User user = users.get(i);
            Long userId = user.getId();
            List<Record> records = recordRepository.findByUserId(userId);
            int starSum = 0;
            int moveSum = 0;
            for (int j = 0; j < records.size(); j++) {
                Record record = records.get(j);
                int star = calculateStar(record.getStageId(), record.getMove());
                starSum += star;
                moveSum += record.getMove();
            }
            Rank rank = new Rank();
            rank.setStar(starSum);
            rank.setMove(moveSum);
            rank.setUsername(user.getUsername());
            rank.setNickname(user.getNickname());

            ranks.add(rank);
        }

        // star 값으로 내림차순 정렬
        ranks.sort(Comparator.comparingInt(Rank::getStar).reversed());

        // star 값이 같은 경우 move 값으로 오름차순 정렬
        ranks.sort(Comparator.comparingInt(Rank::getMove));

        return ranks;
    }


}
