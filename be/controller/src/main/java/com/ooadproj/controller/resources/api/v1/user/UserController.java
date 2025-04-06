package com.ooadproj.controller.resources.api.v1.user;

import com.ooadproj.application.service.userService.UserLoginService;
import com.ooadproj.application.service.userService.UserRegisterService;
import com.ooadproj.domain.model.dto.req.LoginReqBody;
import com.ooadproj.domain.model.key.JwtToken;
import com.ooadproj.domain.model.entity.user.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.security.NoSuchAlgorithmException;

@Controller
@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    @Autowired
    private UserRegisterService userRegisterService;
    @Autowired
    private UserLoginService userLoginService;

    @PostAuthorize("permitAll()")
    @PostMapping("/register")
    public ResponseEntity<JwtToken> registerUser(@RequestBody UserEntity user) {
        try {

            JwtToken tokens = userRegisterService.registerUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(tokens);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostAuthorize("permitAll()")
    @PostMapping("/login")
    public ResponseEntity<JwtToken> loginByEmail(@RequestBody LoginReqBody loginInfo) throws NoSuchAlgorithmException {
        try {
            JwtToken tokens = userLoginService.loginByEmail(loginInfo.getUserEmail(), loginInfo.getPassword());

            return ResponseEntity.status(HttpStatus.OK).body(tokens);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


}
