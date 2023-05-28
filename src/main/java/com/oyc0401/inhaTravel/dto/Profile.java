package com.oyc0401.inhaTravel.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class Profile {
    private Long id;
    private String username;
    private String nickname;
    private int clearStage = 0;
    private int star = 0;
    private int move = 0;
}
