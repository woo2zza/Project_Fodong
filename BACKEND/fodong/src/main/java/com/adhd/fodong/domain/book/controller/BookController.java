package com.adhd.fodong.domain.book.controller;

import com.adhd.fodong.domain.book.dto.BookDetail;
import com.adhd.fodong.domain.book.dto.CharacterDetail;
import com.adhd.fodong.domain.book.entity.Book;
import com.adhd.fodong.domain.book.entity.Character;
import com.adhd.fodong.domain.book.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/books")
public class BookController {

    private final BookService bookService;

    @ResponseStatus(HttpStatus.OK)
    @GetMapping()
    public List<BookDetail> getAllbook() {
        // 보유하고 있는 모든 책들의 데이터 가져오기
        return bookService.getAllBookDetails();
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{bookId}")
    public BookDetail getBook(@PathVariable int bookId) {
        // 특정 책의 정보를 조회
        return bookService.getBook(bookId);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{bookId}/chars")
    public List<CharacterDetail> getCharactersByBookId(@PathVariable int bookId) {
        // bookId 에 등장하는 등장인물 데이터응답
        return bookService.getCharacters(bookId);
    }
}
