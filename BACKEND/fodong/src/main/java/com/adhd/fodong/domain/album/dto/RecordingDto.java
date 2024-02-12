package com.adhd.fodong.domain.album.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class RecordingDto {
    MultipartFile video;
    int profileId;
    int bookId;

    public RecordingDto(MultipartFile video, int profileId, int bookId) {
        this.video = video;
        this.profileId = profileId;
        this.bookId = bookId;
    }
}
