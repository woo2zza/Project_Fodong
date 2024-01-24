package com.adhd.fodong.domains.account.controller;

import com.adhd.fodong.domains.account.service.AccountService;
import com.adhd.fodong.domains.account.service.AccountServiceImpl;
import com.adhd.fodong.global.dto.AccountEmailPasswordDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/account")
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
