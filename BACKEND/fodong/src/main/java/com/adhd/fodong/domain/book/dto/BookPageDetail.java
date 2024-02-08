package com.adhd.fodong.domain.book.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

//@Builder
@Data
public class BookPageDetail {
    // bookId책의 PageNo에 관련된 배경이미지, 캐릭터, 스크립트 정보 DTO
    private int bookId;
    private int pageNo;
    private String backImg;
    private int characterId;
    private String characterName;
    private String characterImg;
    private int scriptNo;
    private String person;
    private String context;
}




