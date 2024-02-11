package com.adhd.fodong.domain.user.account.controller;


import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@Tag(name = "진입테스트 API", description = "서버연결 테스트 화면 제공")
@RestController
public class HelloController {

    @GetMapping("/api/v1")
    public List<String> Hello(){
        return Arrays.asList("연결 성공, 우리 서버 포트는 8080", "리액트 포트는 3000");
    }

}
