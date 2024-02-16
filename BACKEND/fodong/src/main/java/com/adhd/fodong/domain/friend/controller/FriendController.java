package com.adhd.fodong.domain.friend.controller;

import com.adhd.fodong.domain.friend.dto.FriendRequest;
import com.adhd.fodong.domain.friend.entity.Friendship;
import com.adhd.fodong.domain.friend.service.FriendService;
import com.adhd.fodong.domain.user.profile.entity.ProfileEntity;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

@Tag(name = "친구 API", description = "프로필을 기준으로 친구관계를 생성")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/friends")
public class FriendController {

    private final FriendService friendService;
    private final ConcurrentHashMap<String, Boolean> processingRequests = new ConcurrentHashMap<>();

    @Operation(summary = "닉네임으로 프로필 검색", description = "주어진 닉네임으로 프로필을 검색합니다.")
    @ApiResponse(
            responseCode = "200",
            description = "[검색 성공] 해당 프로필ID의 닉네임 값 반환",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = ProfileEntity.class)))
    @GetMapping("/search")
    public List<ProfileEntity> findProfileByNickname(@RequestParam String nickname) {
        System.out.println("조회요청: " + nickname );
        return friendService.findProfilesByNickname(nickname);
    }

    @Operation(summary = "특정 프로필의 친구관계 조회", description = "주어진 프로필 ID의 모든 친구관계를 조회합니다.")
    @ApiResponse(
            responseCode = "200",
            description = "[조회 성공] 해당 프로필ID의 모든 친구관게 리스트 반환",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = ProfileEntity.class)))
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{profileId}")
    public List<ProfileEntity> getRelations(@PathVariable int profileId) {
        // profileId의 모든 친구관계 조회
        return friendService.getRelations(profileId);
    }


    @Operation(summary = "친구 요청 보내기", description = "[SOCKET, STOMP 프로토콜과 연계, 실시간으로 타겟 클라이언트에게 푸쉬 알람연계] 타겟에게 친구 요청을 보냅니다.")
    @ApiResponse(
            responseCode = "201",
            description = "요청 성공", content = @Content(mediaType = "application/json",
            schema = @Schema(implementation = Friendship.class)))
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/requests")
    public Friendship sendFriendRequest(@RequestBody FriendRequest friendRequest) {
        // 친구 추가 요청
        return friendService.sendFriendRequest(friendRequest);
    }

    @Operation(summary = "친구 요청 수락", description = "[SOCKET, STOMP 프로토콜과 연계, 수락 버튼 클릭을 통해 실시간으로 해당 HTTP 통신 연계] 친구 요청을 수락합니다.")
    @ApiResponse(responseCode = "202", description = "수락 성공")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @PostMapping("/requests/accept")
    public String acceptFriendRequest(@RequestBody FriendRequest friendRequest) {
        friendService.acceptFriendRequest(friendRequest);
        return "친구 요청 수락";
    }
    @Operation(summary = "친구 요청 거부", description = "[SOCKET, STOMP 프로토콜과 연계, 거절 버튼 클릭을 통해 실시간으로 해당 HTTP 통신 연계] 친구 요청을 거부합니다.")
    @ApiResponse(responseCode = "200", description = "거부 성공")
    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/requests/reject")
    public String rejectFriendRequest(@RequestBody FriendRequest friendRequest) {
        friendService.rejectFriendRequest(friendRequest);

        return "친구 요청 거부";
    }
}
