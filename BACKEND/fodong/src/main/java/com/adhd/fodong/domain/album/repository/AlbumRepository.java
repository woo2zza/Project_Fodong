package com.adhd.fodong.domain.album.repository;

import com.adhd.fodong.domain.album.dto.RecordingDetails;
import com.adhd.fodong.domain.album.entity.RecordingEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AlbumRepository {

    void save(RecordingEntity recordingEntity);

    List<RecordingDetails> findAllRecordingsByProfileId(int profileId);
}
