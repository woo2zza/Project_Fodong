package com.adhd.fodong.domain.album.service;

import com.adhd.fodong.domain.album.dto.RecordingDetails;
import com.adhd.fodong.domain.album.dto.RecordingDto;
import com.adhd.fodong.domain.album.entity.RecordingEntity;
import com.adhd.fodong.domain.album.repository.AlbumRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.adhd.fodong.global.util.ConvertTool;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AlbumServiceImpl implements AlbumService{

    private final AlbumRepository albumRepository;

    @Override
    public void save(RecordingDto recordingDto) {
        if(recordingDto.getVideo().isEmpty()){
            System.out.println("파일 없음");
        }

        String uploadDir = "/var/www/html/recordings/";
        String fileName = UUID.randomUUID()+".webm";
        // 파일 객체 생성
        File dest = new File(uploadDir + fileName);

        try {
            // 파일 저장
            recordingDto.getVideo().transferTo(dest);
            System.out.println("파일 업로드 성공");
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("파일 업로드 실패");
        }

        RecordingEntity recordingEntity = new RecordingEntity();
        recordingEntity.setProfileId(recordingDto.getProfileId());
        recordingEntity.setRecordingUrl("http://i10c109.p.ssafy.io/recordings/"+fileName); // url 저장
        recordingEntity.setBookId(recordingDto.getBookId()); // book id 설정

        // 엔티티를 데이터베이스에 저장
        albumRepository.save(recordingEntity);
    }

    @Override
    public List<RecordingDetails> getRecordings(int profileId) {
        ConvertTool convertTool = new ConvertTool();
        // profileID로 profile의 모든 녹화본 조회
        if(profileId<=0){
            throw new RuntimeException("error:녹화본 조회 -> 유효하지 않은 profileID");
        }

        //존재하지 않는 profileId?

        List<RecordingDetails> allRecordingsByProfileId = albumRepository.findAllRecordingsByProfileId(profileId);
        List<RecordingDetails> newRecordings = new ArrayList<RecordingDetails>();
        for(RecordingDetails recordingDetails: allRecordingsByProfileId){
            String convertedCover=convertTool.convertToJpg(recordingDetails.getCover());
            recordingDetails.setCover(convertedCover);
            System.out.println(recordingDetails.getCover());
        }

        System.out.println("내껄로 들어옴");

        return allRecordingsByProfileId;
    }
}
