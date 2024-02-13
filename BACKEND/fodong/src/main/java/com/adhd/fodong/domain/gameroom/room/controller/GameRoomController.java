package com.adhd.fodong.domain.gameroom.room.controller;


import com.adhd.fodong.domain.book.entity.Book;
import com.adhd.fodong.domain.gameroom.room.entitiy.RoomSession;
import com.adhd.fodong.domain.gameroom.room.service.GameRoomSessionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@Tag(name = "동화구연방 API", description = "세션방 생성 등 동화구연 관련 기능 제공")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/gamerooms")
public class GameRoomController {

    private final GameRoomSessionService gameRoomSessionService;

    @PostMapping("/create")
    @Operation(summary = "세션 생성", description = "고유한 동화구연방 세션 ID를 생성하고 반환합니다.")
    @ApiResponse(
            responseCode = "200",
            description = "게임방 세션 생성 성공",
            content = @Content(mediaType = "application/json")
    )
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<RoomSession> createGameRoomSession(@RequestBody Book book) {
        RoomSession newRoomSession = gameRoomSessionService.createGameRoomSession(book.getBookId());

        // 성공적으로 게임방 세션 생성 후, 클라이언트에 세션 정보 반환
        return ResponseEntity.ok().body(newRoomSession);
    }
}
