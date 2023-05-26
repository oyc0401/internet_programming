package com.oyc0401.inhaTravel.controller;

import com.oyc0401.inhaTravel.domain.User;
import com.oyc0401.inhaTravel.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class HelloController {

    private final UserService userService;

    @Autowired
    public HelloController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping("/")
    public String hello() {
        return "index";
    }

    @GetMapping("/menu")
    public String menu() {
        return "menu";
    }

//    @GetMapping("/stage1")
//    public String stage() {
//        return "stage1";
//    }

    @GetMapping("/game")
    public String game() {
        return "game";
    }


}
