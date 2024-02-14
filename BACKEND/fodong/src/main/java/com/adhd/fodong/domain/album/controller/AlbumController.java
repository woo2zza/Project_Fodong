package com.adhd.fodong.domain.album.controller;

import com.adhd.fodong.domain.album.dto.RecordingDetails;
import com.adhd.fodong.domain.album.dto.RecordingDto;
import com.adhd.fodong.domain.album.service.AlbumService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.IOException;

import java.util.List;

@Tag(name = "녹화본 API" , description = "녹화본을 저장하고 프로필 별로 조회")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/album")
public class AlbumController {

    private final AlbumService albumService;

    @Operation(summary = "녹화본 저장", description = "녹화본을 profile_id와 book_id와 함께 저장한다.")
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/save")
    public void uploadRecording(
            @RequestParam("video") MultipartFile video,
            @RequestParam("profile_id") int profileId,
            @RequestParam("book_id") int bookId
    ){
        System.out.println("영상 저장 요청 옴");
        RecordingDto recordingDto = new RecordingDto(video,profileId,bookId);
        albumService.save(recordingDto);
        System.out.println("영상 저장 요청 객체 전달");
    }

    @Operation(summary = "녹화본 조회", description = "녹화본을 불러온다.")
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{profileId}")
    public List<RecordingDetails> getRecordings(@PathVariable int profileId) {
        List<RecordingDetails> recordings = albumService.getRecordings(profileId);
        return recordings;
    }
}
