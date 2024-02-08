package com.adhd.fodong.domain.book.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
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
