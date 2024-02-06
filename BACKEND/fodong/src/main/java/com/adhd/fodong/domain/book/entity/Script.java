package com.adhd.fodong.domain.book.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class Script {

    private int bookId;
    private int pageNo;
    private int scriptNo;
    private String person;
    private String context;
}
