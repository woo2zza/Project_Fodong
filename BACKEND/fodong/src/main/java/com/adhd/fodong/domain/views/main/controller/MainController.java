package com.adhd.fodong.domain.views.main.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/main")
@RequiredArgsConstructor
public class MainController {

    @ResponseStatus(HttpStatus.OK)
    @GetMapping({"/{profileId}"})
    public void initMain(@PathVariable int profileId) {

    }

}
