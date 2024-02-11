package com.adhd.fodong.domain.album.service;

import com.adhd.fodong.domain.album.dto.RecordingDetails;
import com.adhd.fodong.domain.album.dto.RecordingDto;
import com.adhd.fodong.domain.album.entity.RecordingEntity;

import java.util.List;

public interface AlbumService {
    public void save(RecordingDto recordingDto);
    public List<RecordingDetails> getRecordings(int profileId);
}
