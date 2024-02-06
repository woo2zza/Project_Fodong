package com.adhd.fodong.domain.user.account.controller;

import com.adhd.fodong.domain.user.account.service.AccountService;
import com.adhd.fodong.global.dto.AccountEmailPasswordDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/account")
public class AccountController {

    private final AccountService accountService;

    // 일반계정 회원가입
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/join")
    public String joinProcess(@RequestBody AccountEmailPasswordDto accountEmailPasswordDto) {
        accountService.joinProcess(accountEmailPasswordDto);
        return "회원가입 성공";
    }

}
