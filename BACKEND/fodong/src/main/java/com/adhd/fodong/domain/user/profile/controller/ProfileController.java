package com.adhd.fodong.domain.user.profile.controller;


import com.adhd.fodong.domain.user.profile.entity.ProfileEntity;
import com.adhd.fodong.domain.user.profile.service.ProfileService;
import com.adhd.fodong.domain.user.profile.dto.ProfileDetails;
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

import java.util.List;

@Tag(name = "프로필 API" , description = "계정 당 4개의 프로필을 허용하며 중복된 닉네임을 허용")
@RestController
@RequestMapping("/api/v1/profiles")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    @Operation(summary = "프로필 생성", description = "계정ID와 닉네임을 받아 프로필을 DB에 등록한다")
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/{accountId}")
    public void makeProfile(@Parameter(description = "계정 ID") @PathVariable int accountId,
                            @RequestBody ProfileDetails profileDetails) {
        profileService.makeProfile(accountId, profileDetails);
    }

    @Operation(summary = "프로필 조회", description = "해당 계정이 보유한 모든 프로필을 조회한다")
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{accountId}")
    public List<ProfileEntity> getProfiles(@Parameter(description = "계정 ID") @PathVariable int accountId) {
        List<ProfileEntity> profiles = profileService.getProfiles(accountId);
        return profiles;
    }

    @Operation(summary = "프로필 객체 조회", description = "프로필ID를 통해 해당 프로필 객체 데이터를 조회한다.")
    @ApiResponse(responseCode = "200",
            description = "조회 성공",
            content = @Content(schema = @Schema(implementation = ProfileEntity.class)))
    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping("/one/{profileId}")
    public ProfileEntity getProfile(@PathVariable int profileId) {
        return profileService.getProfile(profileId);
    }


    @Operation(summary = "프로필 수정", description = "프로필 닉네임을 수정")
    @ResponseStatus(HttpStatus.OK)
    @PatchMapping("/{profileId}")
    public void updateProfile(@Parameter(description = "프로필 ID") @PathVariable int profileId,
                              @RequestBody ProfileDetails profileDetails) {
        profileService.updateProfile(profileId, profileDetails);
    }

    @Operation(summary = "프로필 삭제", description = "프로필을 삭제한다")
    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/{profileId}")
    public void deleteProfile(@Parameter(description = "프로필 ID") @PathVariable int profileId) {
        profileService.deleteProfile(profileId);
        System.out.println("프로필 삭제요청");
    }
}
