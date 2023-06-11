package com.oyc0401.inhaTravel.controller;

import com.oyc0401.inhaTravel.dto.SignupRequest;
import com.oyc0401.inhaTravel.service.AdminService;
import com.oyc0401.inhaTravel.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/admin")
public class AdminController {


    private final AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }


    @PostMapping("/give")
    public ResponseEntity<?> give(HttpServletRequest request, @RequestBody AdminId AdminId) {
//        // 현재 세션 가져오기
//        HttpSession session = request.getSession(false);
//        if (session != null) {
//            session.invalidate(); // 세션 무효화
//        }
        adminService.giveAdmin(AdminId.getAdminId());
        return ResponseEntity.ok("give success");
    }



}

@Getter
@Setter
class AdminId {
    private Long adminId;
}