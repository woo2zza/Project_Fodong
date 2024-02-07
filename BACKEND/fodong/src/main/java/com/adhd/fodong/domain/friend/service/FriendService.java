package com.adhd.fodong.domain.friend.service;

import com.adhd.fodong.domain.friend.entity.FriendShip;
import org.springframework.context.annotation.Profile;

import java.util.List;

public interface FriendService {

    // 친구 요청하는 기능
    void sendFriendRequest(int fromProfileId, int toProfileId);

    // 친구 수락하는 기능
    void acceptFriendRequest(int friendshipId);

    // 친구 거절하는 기능
    void rejectFriendRequest(int friendshipId);

    // 친구 조회하는 기능
    List<Profile> getFriends(int profileId);

}
