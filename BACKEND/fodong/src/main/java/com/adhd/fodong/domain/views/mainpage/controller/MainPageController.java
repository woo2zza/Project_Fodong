package com.adhd.fodong.domain.views.mainpage.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/main")
@RequiredArgsConstructor
public class MainPageController {

    @ResponseStatus(HttpStatus.OK)
    @GetMapping({"/{profileId}"})
    public void initMain(@PathVariable int profileId) {

    }

}
