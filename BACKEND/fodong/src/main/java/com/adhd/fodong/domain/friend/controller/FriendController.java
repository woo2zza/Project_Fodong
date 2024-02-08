package com.adhd.fodong.domain.friend.controller;

import com.adhd.fodong.domain.friend.dto.FriendRequest;
import com.adhd.fodong.domain.friend.entity.Friendship;
import com.adhd.fodong.domain.friend.service.FriendService;
import com.adhd.fodong.domain.user.profile.entity.ProfileEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/friends")
public class FriendController {

    private final FriendService friendService;


    @GetMapping("/search")
    public List<ProfileEntity> findProfileByNickname(@RequestParam String nickname) {
        //머지용
        return friendService.findProfilesByNickname(nickname);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{profileId}")
    public List<ProfileEntity> getRelations(@PathVariable int profileId) {
        // profileId의 모든 친구관계 조회
        return friendService.getRelations(profileId);
    }


    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/requests")
    public Friendship sendFriendRequest(@RequestBody FriendRequest friendRequest) {
        // 친구 추가 요청
        return friendService.sendFriendRequest(friendRequest);
    }

    @ResponseStatus(HttpStatus.ACCEPTED)
    @PostMapping("/requests/accept")
    public String acceptFriendRequest(@RequestBody FriendRequest friendRequest) {
        friendService.acceptFriendRequest(friendRequest);
        return "친구 요청 수락";
    }

    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/requests/reject")
    public String rejectFriendRequest(@RequestBody FriendRequest friendRequest) {
        friendService.rejectFriendRequest(friendRequest);

        return "친구 요청 거부";
    }
}
