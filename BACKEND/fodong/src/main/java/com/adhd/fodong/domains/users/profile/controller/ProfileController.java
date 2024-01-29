package com.adhd.fodong.domains.users.profile.controller;


import com.adhd.fodong.domains.users.profile.dto.UpdateProfile;
import com.adhd.fodong.domains.users.profile.entity.ProfileEntity;
import com.adhd.fodong.domains.users.profile.service.ProfileService;
import com.adhd.fodong.domains.users.profile.dto.MakeProfile;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{accountId}")
    public List<ProfileEntity> getProfiles(@PathVariable int accountId) {
        List<ProfileEntity> profiles = profileService.getProfiles(accountId);
        System.out.println("프로필 전체조회 요청도달 accountId : " + accountId);
        return profiles;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/make")
    public String makeProfile(@RequestBody MakeProfile makeProfile) {
        profileService.makeProfile(makeProfile);
        return "프로필 생성 성공";
    }


    @ResponseStatus(HttpStatus.OK)
    @PatchMapping("/update")
    public void updateProfile(@RequestBody UpdateProfile updateProfile) {
        profileService.updateProfile(updateProfile);
    }

    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/{profileId}")
    public void deleteProfile(@PathVariable int profileId) {
        profileService.deleteProfile(profileId);
    }



}
