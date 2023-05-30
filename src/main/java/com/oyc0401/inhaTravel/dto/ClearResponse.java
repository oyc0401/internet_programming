package com.oyc0401.inhaTravel.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ClearResponse {

    int rank;
    int star;
    int move;
    boolean nextExist = true;

}
