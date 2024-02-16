package com.adhd.fodong.domain.book.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class Character {
    private int bookId;
    private int pageNo;
    private int characterId;
    private String characterName;
    private String characterImg;

    public Character(int bookId, int pageNo, int characterId, String characterName, String characterImg) {
        this.bookId = bookId;
        this.pageNo = pageNo;
        this.characterId = characterId;
        this.characterName = characterName;
        this.characterImg = characterImg;
    }
}
