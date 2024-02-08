package com.adhd.fodong.domain.book.repository;

import com.adhd.fodong.domain.book.dto.BookAllImgData;
import com.adhd.fodong.domain.book.dto.BookPageDetail;
import com.adhd.fodong.domain.book.entity.Book;
import com.adhd.fodong.domain.book.entity.BookPage;
import com.adhd.fodong.domain.book.entity.Character;
import com.adhd.fodong.domain.book.entity.Script;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Optional;

@Mapper
public interface BookRepository {


    // 존재하는 모든 책의 정보 조회
    List<Book> findAllBook();


    // bookId의 정보 조회
    Optional<Book> findBookById(int bookId);

    // bookId의 페이지 갯수 조회
    Integer countPagesByBookId(Integer bookId);

    // bookId의 모든 캐릭터 조회
    List<Character> getAllCharactersByBookId(int bookId);

    // bookId의
    List<BookPage> getAllBackImgByBookId(int bookId);




    // bookId와 페이지번호를 이용해 해당 페이지의 모든 배경이미지 조회
    List<BookPage> getBackgroundByBookIdAndPageNo(int bookId, int pageNo);

    // bookId와 페이지번호를 이용해 해당 페이지의 모든 등장인물 이미지 조회
    List<Character> getCharactersByBookIdAndPageNo(int bookId, int pageNo);

    // bookId와 페이지번호를 이용해 해당 책의 페이지에 존재하는 모든 스크립트 조회
    List<Script> getScriptsByBookIdAndPageNo(int bookId, int pageNo);

    // bookId가 가진 모든 관련 데이터 조회
    List<BookAllImgData> getAllImgDataByBookId(int bookId);


    // bookId와 페이지번호를 이용해 해당 책의 페이지에 존재하는 모든 이미지 조회
    List<BookPageDetail> getDataAtPageByBookIdAndPageNo(int bookId, int pageNo);

    void saveBook(Book book);

}
