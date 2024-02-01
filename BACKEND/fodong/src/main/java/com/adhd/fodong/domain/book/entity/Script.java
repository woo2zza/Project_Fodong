package com.adhd.fodong.domain.book.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Script {

    private int bookId;
    private int pageNo;
    private int scriptNo;
    private String person;
    private String context;
}
