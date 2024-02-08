package com.adhd.fodong.domain.friend.service;

import com.adhd.fodong.domain.friend.dto.FriendRequest;
import com.adhd.fodong.domain.friend.entity.Friendship;
import com.adhd.fodong.domain.user.profile.entity.ProfileEntity;
import org.springframework.context.annotation.Profile;

import java.util.List;

public interface FriendService {

    // 닉네임을 입력하면 해당 닉네임을 포함하고 있는 모든 profileId 필드 조회하는 기능
    List<ProfileEntity> findProfilesByNickname(String nickname);


    // 친구 요청하는 기능
    Friendship sendFriendRequest(FriendRequest friendRequest);

    // 친구 수락하는 기능
    void acceptFriendRequest(FriendRequest friendRequest);

    // 친구 거절하는 기능
    void rejectFriendRequest(FriendRequest friendRequest);

    // 친구 조회하는 기능
    List<ProfileEntity> getRelations(int profileId);

}
