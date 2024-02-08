package com.adhd.fodong.domain.album.service;

import com.adhd.fodong.domain.album.entity.RecordingEntity;

import java.util.List;

public interface AlbumService {
    public List<RecordingEntity> getRecordings(int profileId);
}
