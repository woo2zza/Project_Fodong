package com.adhd.fodong.domains.profile.controller;


import com.adhd.fodong.domains.profile.entity.ProfileEntity;
import com.adhd.fodong.domains.profile.service.ProfileService;
import com.adhd.fodong.global.dto.MakeProfileDto;
import com.adhd.fodong.global.dto.ProfileRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public List<ProfileEntity> getProfiles(@RequestBody ProfileRequest profileRequest) {
        int accountId = profileRequest.getAccountId();
        List<ProfileEntity> profiles = profileService.getProfiles(accountId);
        return profiles;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/make")
    public String makeProfile(@RequestBody MakeProfileDto makeProfileDto) {
        profileService.makeProfile(makeProfileDto);
        return "프로필 생성 성공";
    }



}
