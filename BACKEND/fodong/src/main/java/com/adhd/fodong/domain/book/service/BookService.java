package com.adhd.fodong.domain.book.service;

import com.adhd.fodong.domain.book.dto.BookDetail;
import com.adhd.fodong.domain.book.dto.CharacterDetail;
import com.adhd.fodong.domain.book.entity.Book;
import com.adhd.fodong.domain.book.entity.Character;

import java.util.List;

public interface BookService {

    // 모든 책 정보 가져오기
    List<Book> getAllBook();

    List<BookDetail> getAllBookDetails();

    BookDetail getBook(int bookId);

    Integer getMaxPage(int bookId);

    List<CharacterDetail> getCharacters(int bookId);

    // 동화별로
    // 모든
    // 등장인물 가져오기
}
