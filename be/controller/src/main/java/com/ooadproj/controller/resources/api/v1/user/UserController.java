package com.ooadproj.controller.resources.api.v1.user;

import com.ooadproj.application.service.userService.UserAuthenticationService;
import com.ooadproj.application.service.userService.UserRegisterService;
import com.ooadproj.domain.model.entity.key.JwtToken;
import com.ooadproj.domain.model.entity.user.UserDomainEntity;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.List;

@Controller
@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    @Autowired
    private UserAuthenticationService userAuthenticationService;
    @Autowired
    private UserRegisterService userRegisterService;

    @PostAuthorize("permitAll()")
    @PostMapping("/register")
    public ResponseEntity<JwtToken> registerUser(@RequestBody UserDomainEntity user) {
        try {
            JwtToken tokens = userRegisterService.registerUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(tokens);
        } catch (Exception e) {
            System.out.println("Error: " + user);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

//    @GetMapping("/login")
//    public List<UserDomainEntity> findUser() {
//        return userRegisterService.findAll();
//    }


}
