package com.adhd.fodong.domain.book.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Book {

    private int bookId;
    private String title;
    private String summary;
    private int playCnt;
    private String cover;

    public Book() {

    }

    public Book(String title, String summary, int playCnt, String cover) {
        this.title = title;
        this.summary = summary;
        this.playCnt = playCnt;
        this.cover = cover;
    }
}
