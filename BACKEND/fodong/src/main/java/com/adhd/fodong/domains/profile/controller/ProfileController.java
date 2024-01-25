package com.adhd.fodong.domains.profile.controller;


import com.adhd.fodong.domains.profile.service.ProfileService;
import com.adhd.fodong.global.dto.MakeProfileDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/make")
    public String makeProfile(@RequestBody MakeProfileDto makeProfileDto) {
        profileService.makeProfile(makeProfileDto);
        return "프로필 생성 성공";
    }

}
