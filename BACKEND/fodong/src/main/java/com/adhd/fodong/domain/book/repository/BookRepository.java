package com.adhd.fodong.domain.book.repository;

import com.adhd.fodong.domain.book.entity.Book;
import com.adhd.fodong.domain.book.entity.Character;
import org.apache.ibatis.annotations.Mapper;

import javax.swing.text.html.Option;
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
    List<Character> findAllCharacters(int bookId);

    void saveBook(Book book);

}
