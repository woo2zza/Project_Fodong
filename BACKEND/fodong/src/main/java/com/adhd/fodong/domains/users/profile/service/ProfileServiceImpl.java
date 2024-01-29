package com.adhd.fodong.domains.users.profile.service;


import com.adhd.fodong.domains.users.account.repository.AccountRepository;
import com.adhd.fodong.domains.users.profile.dto.UpdateProfile;
import com.adhd.fodong.domains.users.profile.entity.ProfileEntity;
import com.adhd.fodong.domains.users.profile.repository.ProfileRepository;
import com.adhd.fodong.domains.users.profile.dto.MakeProfile;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService{

    private final ProfileRepository profileRepository;
    private final AccountRepository accountRepository;

    @Override
    public List<ProfileEntity> getProfiles(int accountId) {
        // accountId로 모든 프로필 조회
        if (accountId <= 0) {
            throw new RuntimeException("error:프로필 조회 -> 유요하지 않은 accountId 값");
        }

        boolean existsAccount = accountRepository.existsByAccountId(accountId);
        if (!existsAccount) {
            throw new RuntimeException("error:프로필조회 -> 존재하지 않는 accountId");
        }

        List<ProfileEntity> allProfileByAccountId = profileRepository.findAllProfileByAccountId(accountId);
        if (allProfileByAccountId == null) {
            throw new RuntimeException("error:프로필조회 -> 프로필 조회 오류");
        }

        System.out.println(accountId + "의 모든 프로필 조회");
        
        return allProfileByAccountId;
    }

    @Override
    public void makeProfile(@RequestBody MakeProfile makeProfile) {
        // 프로필 생성

        int accountId = makeProfile.getAccountId();
        String nickname = makeProfile.getNickname();

        if (nickname == null || nickname.isBlank()) {
            throw new RuntimeException("프로필 생성 : 비어있는 프로필 에러");
        }

        if (accountId <= 0) {
            throw new RuntimeException("유요하지 않은 account Id");
        }

        // 해당 account에 종속된 프로필이 4개보다 많으면 에러
        List<ProfileEntity> allProfileByAccountId = profileRepository.findAllProfileByAccountId(accountId);

        if (allProfileByAccountId.size() >= 4) {
            throw new RuntimeException("한 계정에 4개를 초과하는 프로필 생성 요청");
        }

        // DB에 프로필 저장
        ProfileEntity newProfile = new ProfileEntity();
        newProfile.setAccountId(accountId);
        newProfile.setNickname(nickname);
        profileRepository.save(newProfile);
        System.out.println("프로필 생성성공 : " + nickname);
    }

    @Override
    public void updateProfile(UpdateProfile updateProfile) {
        int profileId = updateProfile.getProfileId();
        String newNickName = updateProfile.getNickname();
        profileRepository.updateNicknameByProfileId(profileId, newNickName);
        System.out.println("프로필 수정 성공 :" + newNickName);
    }

    @Override
    public void deleteProfile(int profileId) {
        profileRepository.delete(profileId);
    }
}
