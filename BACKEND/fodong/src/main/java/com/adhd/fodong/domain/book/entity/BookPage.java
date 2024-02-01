package com.adhd.fodong.domain.book.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookPage {

    private int pageNo;
    private int bookId;
    private String backImg;

    public BookPage(int pageNo, int bookId, String backImg) {
        this.pageNo = pageNo;
        this.bookId = bookId;
        this.backImg = backImg;
    }
}
