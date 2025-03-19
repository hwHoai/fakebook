package com.ooadproj.controller.resources.api.v1.user;

import com.ooadproj.application.service.userService.UserAuthenticationService;
import com.ooadproj.application.service.userService.UserRegisterService;
import com.ooadproj.domain.model.entity.key.JwtToken;
import com.ooadproj.domain.model.entity.user.UserDomainEntity;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
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
    public JwtToken register(@RequestBody UserDomainEntity user) throws NoSuchAlgorithmException, NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException, InvalidKeyException, BadRequestException {
        return userRegisterService.registerUser(user);
    }

//    @GetMapping("/login")
//    public List<UserDomainEntity> findUser() {
//        return userRegisterService.findAll();
//    }


}
