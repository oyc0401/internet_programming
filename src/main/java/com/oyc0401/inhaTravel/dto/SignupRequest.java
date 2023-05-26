package com.oyc0401.inhaTravel.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class SignupRequest {
    private String username;
    private String password;
    private String nickname;
}
