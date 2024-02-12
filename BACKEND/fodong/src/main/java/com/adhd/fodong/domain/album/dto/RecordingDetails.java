package com.adhd.fodong.domain.album.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RecordingDetails {
    private int recordingID;
    private String recordingUrl;
    private int profileId;
    private int bookId;
    private String title;
    private String cover;
}
