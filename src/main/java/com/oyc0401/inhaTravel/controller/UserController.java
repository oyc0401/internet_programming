package com.oyc0401.inhaTravel.controller;

import com.oyc0401.inhaTravel.domain.User;
import com.oyc0401.inhaTravel.dto.LoginRequest;
import com.oyc0401.inhaTravel.dto.SignupRequest;
import com.oyc0401.inhaTravel.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
//@CrossOrigin(origins = "http://localhost:63342/, http://localhost:63343/, http://127.0.0.1:53649/")
@RequestMapping("/api")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody SignupRequest request) {
        if (userService.existsByUsername(request.getUsername())) {
            return ResponseEntity.badRequest().body("Username is already taken!");
        }
        if (request.getUsername().equals("")) {
            return ResponseEntity.badRequest().body("아이디를 입력해주세요");
        }
        if (request.getNickname().equals("")) {
            return ResponseEntity.badRequest().body("닉네임을 입력해주세요");
        }
        if (request.getPassword().equals("")) {
            return ResponseEntity.badRequest().body("비밀번호를 입력해주세요");
        }



        userService.signup(request.getUsername(), request.getPassword(), request.getNickname());

        return ResponseEntity.ok("Signup successful!");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(HttpServletRequest request, @RequestBody LoginRequest loginRequest) {
        Optional<User> user = userService.authenticate(loginRequest.getUsername(), loginRequest.getPassword());
        if (user.isPresent()) {
            // 사용자 정보를 세션에 저장
            HttpSession session = request.getSession();
            session.setAttribute("userId", user.get().getId());

//            System.out.println(request.getSession().getId());

            return ResponseEntity.ok(user);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getUser(HttpServletRequest request) {
        // 현재 세션 가져오기
        HttpSession session = request.getSession();
        Long userId = (Long) session.getAttribute("userId");

        if (userId != null) {
            // 세션에서 사용자 정보를 가져옴
            Optional<User> user = userService.getUserById(userId);
            // 해당하는 유저가 없으면 회원가입을 안한 것
            if (user.isPresent()) {
                return ResponseEntity.ok(user);
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not signup");
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not logged in");
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        // 현재 세션 가져오기
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate(); // 세션 무효화
        }


        return ResponseEntity.ok("Logged out successfully");
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> delete(HttpServletRequest request) {
        // 현재 세션 가져오기
        HttpSession session = request.getSession();
        Long userId = (Long) session.getAttribute("userId");

        if (userId != null) {
            return deleteUser(userId);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not logged in");
    }

    @DeleteMapping("/users/{id}")
    private ResponseEntity<?> deleteUser(@PathVariable Long id) {
        boolean deleted = userService.deleteUserById(id);
        if (deleted) {
            return ResponseEntity.ok("User deleted successfully!");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
