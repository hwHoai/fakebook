package com.ooadproj.controller.resources.api.v1.user;

import com.ooadproj.application.service.userService.UserAuthentication;
import com.ooadproj.domain.model.entity.user.UserDomainEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    @Autowired
    private UserAuthentication userAuthentication;

    @PostMapping("/register")
    public UserDomainEntity register(@RequestBody UserDomainEntity user) {
        System.out.println(user);
        return userAuthentication.createUser(user);
    }

    @GetMapping("/login")
    public String login() {
        return "Hello world";
    }
}
