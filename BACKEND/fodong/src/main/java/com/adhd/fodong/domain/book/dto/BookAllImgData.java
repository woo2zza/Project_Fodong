package com.adhd.fodong.domain.book.dto;

import lombok.Data;

@Data
public class BookAllImgData {
    // bookId책의 PageNo에 관련된 배경이미지, 캐릭터 이미지 정보 DTO (스크립트 정보없음)
    private int bookId;
    private int pageNo;
    private String backImg;
    private int characterId;
    private String characterName;
    private String characterImg;
}
