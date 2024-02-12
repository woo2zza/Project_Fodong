package com.adhd.fodong.domain.album.service;

import com.adhd.fodong.domain.album.dto.RecordingDetails;
import com.adhd.fodong.domain.album.dto.RecordingDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AlbumService {
    public void save(RecordingDto recordingDto);
    public List<RecordingDetails> getRecordings(int profileId);
}
