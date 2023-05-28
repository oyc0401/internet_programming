package com.oyc0401.inhaTravel.dto;

import com.oyc0401.inhaTravel.domain.Record;
import com.oyc0401.inhaTravel.domain.Stage;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class StageInformation {
    Stage stage;
    Boolean clear = false;
    Boolean unlock = false;
    int move;
    int star;
}
