package com.adhd.fodong.domain.book.controller;

import com.adhd.fodong.domain.book.dto.BookInfo;
import com.adhd.fodong.domain.book.dto.BookPageDetail;
import com.adhd.fodong.domain.book.dto.CharacterDetail;
import com.adhd.fodong.domain.book.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/books")
public class BookController {

    private final BookService bookService;

    @ResponseStatus(HttpStatus.OK)
    @GetMapping()
    public List<BookInfo> getAllbook() {
        // 보유하고 있는 모든 책들의 데이터 가져오기
        return bookService.getAllBookDetails();
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{bookId}")
    public BookInfo getBook(@PathVariable int bookId) {
        // 특정 책의 정보를 조회
        return bookService.getBook(bookId);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{bookId}/chars")
    public List<CharacterDetail> getCharacters(@PathVariable int bookId) {
        // bookId 에 등장하는 등장인물 데이터응답
        return bookService.getCharacters(bookId);
    }

    // bookId와 페이지번호를 이용해 해당 페이지에 존재하는 모든 데이터 정보 조회
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{bookId}/pages/{pageNo}")
    public List<BookPageDetail> getAllDataAtPage(@PathVariable int bookId,
                                                 @PathVariable int pageNo) {
        return bookService.getAllDataAtPage(bookId, pageNo);
    }


    // bookId와 페이지번호를 이용해 해당 책의 존재하는 페이지의 배경이미지 조회
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{bookId}/pages/{pageNo}/backgrounds")
    public List<BookPageDetail> getBackImgAtPage(@PathVariable int bookId,
                                                 @PathVariable int pageNo) {
        return bookService.getBackImgAtPage(bookId, pageNo);
    }

    // bookId와 페이지번호를 이용해 페이지에 존재하는 등장인물 조회
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{bookId}/pages/{pageNo}/characters")
    public List<BookPageDetail> getCharImgAtPage(@PathVariable int bookId,
                                                 @PathVariable int pageNo) {
        return bookService.getCharImgAtPage(bookId, pageNo);
    }


    // bookId와 페이지번호를 이용해 페이지에 존재하는 모든 스크립트 조회
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{bookId}/pages/{pageNo}/scripts")
    public List<BookPageDetail> getScriptsAtPage(@PathVariable int bookId,
                                                 @PathVariable int pageNo) {
        return bookService.getScriptAtPage(bookId, pageNo);
    }


    // 책 생성 API
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/make/{numbers}")
    public void makeDummyBook(@PathVariable int numbers) {
        bookService.makeDummyBook(numbers);
    }
}
