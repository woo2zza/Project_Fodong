package com.adhd.fodong.domain.user.account.controller;

import com.adhd.fodong.domain.user.account.entity.AccountEntity;
import com.adhd.fodong.domain.user.account.service.AccountService;
import com.adhd.fodong.domain.user.profile.entity.ProfileEntity;
import com.adhd.fodong.domain.user.profile.service.ProfileService;
import com.adhd.fodong.global.dto.AccountEmailPasswordDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@Tag(name = "계정 API" , description = "계정(ACCOUNT) 회원가입 기능")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/account")
public class AccountController {

    private final AccountService accountService;

    // 일반계정 회원가입
    @Operation(summary = "계정 회원가입", description = "이메일과 비밀번호를 받아 계정을 DB에 등록한다")
    @ApiResponse(responseCode = "201",
            description = "회원가입 성공",
            content = @Content(schema = @Schema(implementation = AccountEmailPasswordDto.class)))
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/join")
    public String joinProcess(@RequestBody AccountEmailPasswordDto accountEmailPasswordDto) {
        accountService.joinProcess(accountEmailPasswordDto);
        return "회원가입 성공";
    }

}
