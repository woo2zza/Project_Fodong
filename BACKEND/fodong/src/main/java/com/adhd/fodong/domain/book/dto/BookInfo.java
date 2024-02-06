package com.adhd.fodong.domain.book.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class BookInfo {

    // 책 정보
    private int bookId;
    private String title;
    private String summary;
    private int playCnt;
    private String cover;
    private int maxPageNo;

    // 등장인물
    private List<String> characters;
}
