package com.adhd.fodong.domain.album.service;

import com.adhd.fodong.domain.album.entity.RecordingEntity;
import com.adhd.fodong.domain.album.repository.AlbumRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AlbumServiceImpl implements AlbumService{

    private final AlbumRepository albumRepository;
    @Override
    public List<RecordingEntity> getRecordings(int profileId) {
        // profileID로 profile의 모든 녹화본 조회
        if(profileId<=0){
            throw new RuntimeException("error:녹화본 조회 -> 유효하지 않은 profileID");
        }

        //존재하지 않는 profileId?

        List<RecordingEntity> allRecordingsByProfileId = albumRepository.findAllRecordingsByProfileId(profileId);

        return allRecordingsByProfileId;
    }
}
