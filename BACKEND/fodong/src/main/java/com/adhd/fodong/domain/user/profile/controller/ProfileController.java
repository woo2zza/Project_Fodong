package com.adhd.fodong.domain.user.profile.controller;


import com.adhd.fodong.domain.user.profile.entity.ProfileEntity;
import com.adhd.fodong.domain.user.profile.service.ProfileService;
import com.adhd.fodong.domain.user.profile.dto.ProfileDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/profiles")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/{accountId}")
    public void makeProfile(@PathVariable int accountId, @RequestBody ProfileDetails profileDetails) {
        profileService.makeProfile(accountId, profileDetails);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{accountId}")
    public List<ProfileEntity> getProfiles(@PathVariable int accountId) {
        List<ProfileEntity> profiles = profileService.getProfiles(accountId);
        return profiles;
    }


    @ResponseStatus(HttpStatus.OK)
    @PatchMapping("/{profileId}")
    public void updateProfile(@PathVariable int profileId, @RequestBody ProfileDetails profileDetails) {
        profileService.updateProfile(profileId, profileDetails);
    }

    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/{profileId}")
    public void deleteProfile(@PathVariable int profileId) {
        profileService.deleteProfile(profileId);
        System.out.println("프로필 삭제요청");
    }
}
