package com.oyc0401.inhaTravel.controller;

import com.oyc0401.inhaTravel.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

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

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/game")
    public String game(@RequestParam("stage") String stageNum, Model model) {
        model.addAttribute("stage", stageNum);
        return "stage";
    }


}
