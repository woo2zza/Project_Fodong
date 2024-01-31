package com.adhd.fodong.domain.user.profile.repository;

import com.adhd.fodong.domain.user.profile.entity.ProfileEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;


@Mapper
public interface ProfileRepository {
    
    // 프로필 생성
    void save(ProfileEntity profileEntity);
    
    // profile ID로 단일 프로필 객체 조회
    ProfileEntity findById(int profileId);

    // account ID로 연결된 모든 프로필 ID조회
    List<ProfileEntity> findAllProfileByAccountId(int accountId);

    // profile ID로 닉네임 수정
    void updateNicknameByProfileId(int profileId, String nickname);

    void delete(int profileId);
}
