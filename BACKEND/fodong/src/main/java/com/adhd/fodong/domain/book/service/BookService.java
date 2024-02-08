package com.adhd.fodong.domain.book.service;

import com.adhd.fodong.domain.book.dto.BookAllImgData;
import com.adhd.fodong.domain.book.dto.BookInfo;
import com.adhd.fodong.domain.book.dto.BookPageDetail;
import com.adhd.fodong.domain.book.dto.CharacterDetail;
import com.adhd.fodong.domain.book.entity.Book;

import java.util.List;

public interface BookService {

    // 모든 책 정보 가져오기
    List<Book> getAllBook();

    List<BookInfo> getAllBookDetails();

    BookInfo getBook(int bookId);

    Integer getMaxPage(int bookId);

    List<CharacterDetail> getCharacters(int bookId);

    List<BookAllImgData> bookInitRender(int bookId);
//    List<BookAllImgData> getBookAllImgData(int bookId);


    List<BookPageDetail> getAllDataAtPage(int bookId, int pageNo);

    List<BookPageDetail> getBackImgAtPage(int bookId, int pageNo);

    List<BookPageDetail> getCharImgAtPage(int bookId, int pageNo);

    List<BookPageDetail> getScriptAtPage(int bookId, int pageNo);

    void makeDummyBook(int numbers);
    // 동화별로
    // 모든
    // 등장인물 가져오기
}
