package com.adhd.fodong.domain.book.controller;

import com.adhd.fodong.domain.book.dto.BookAllImgData;
import com.adhd.fodong.domain.book.dto.BookInfo;
import com.adhd.fodong.domain.book.dto.BookPageDetail;
import com.adhd.fodong.domain.book.dto.CharacterDetail;
import com.adhd.fodong.domain.book.service.BookService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Tag(name = "동화책 API", description = "책 정보, 이미지 데이터 위치 등 동화책과 관련된 기능 제공 ")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/books")
public class BookController {

    private final BookService bookService;


    @GetMapping()
    @Operation(summary = "모든 책 정보 조회", description = "서버 DB에서 보유하고 있는 모든 책들의 정보를 조회합니다.")
    @ApiResponse(responseCode = "200", description = "조회 성공", content = @Content(mediaType = "application/json", schema = @Schema(implementation = BookInfo.class)))
    @ResponseStatus(HttpStatus.OK)
    public List<BookInfo> getAllbook() {
        // 보유하고 있는 모든 책들의 데이터 가져오기
        return bookService.getAllBookDetails();
    }

    @GetMapping("/{bookId}")
    @Operation(summary = "단일 책 정보 조회", description = "특정 책의 정보를 조회합니다.")
    @ApiResponse(responseCode = "200", description = "조회 성공", content = @Content(mediaType = "application/json", schema = @Schema(implementation = BookInfo.class)))
    @ResponseStatus(HttpStatus.OK)
    public BookInfo getBook(@PathVariable int bookId) {
        // 특정 책의 요약 정보를 조회
        return bookService.getBook(bookId);
    }

    @GetMapping("/{bookId}/chars")
    @Operation(summary = "책의 등장인물 정보 조회", description = "특정 책에 등장하는 모든 등장인물의 정보를 조회합니다.")
    @ApiResponse(responseCode = "200", description = "조회 성공", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CharacterDetail.class)))
    @ResponseStatus(HttpStatus.OK)
    public List<CharacterDetail> getCharacters(@PathVariable int bookId) {
        // bookId 에 등장하는 등장인물 데이터응답
        return bookService.getCharacters(bookId);
    }

    @GetMapping("/{bookId}/init")
    @Operation(summary = "초기 렌더링을 위한 고용량 데이터 조회", description = "특정 책의 고용량 데이터(이미지 등)을 초기 렌더링을 위해 조회합니다.")
    @ApiResponse(responseCode = "200", description = "조회 성공", content = @Content(mediaType = "application/json", schema = @Schema(implementation = BookAllImgData.class)))
    @ResponseStatus(HttpStatus.OK)
    public List<BookAllImgData> initRender(@PathVariable int bookId) {
        // bookId에 존재하는 고용량 데이터 응답
        return bookService.bookInitRender(bookId);
    }

//    @ResponseStatus(HttpStatus.OK)
//    @GetMapping("/{bookId}/data")
//    public List<BookAllImgData> getBookAllImgData(@PathVariable int bookId) {
//       // bookId가 가지고 있는 모든 데이터 조회(이미지 등) !스크립트 제외
//        return bookService.getBookAllImgData(bookId);
//    }


    // bookId와 페이지번호를 이용해 해당 페이지에 존재하는 모든 데이터 정보 조회
    @GetMapping("/{bookId}/pages/{pageNo}")
    @ResponseStatus(HttpStatus.OK)
    @Operation(summary = "특정 페이지의 모든 데이터 정보 조회", description = "책 ID와 페이지 번호를 이용해 해당 페이지에 존재하는 모든 데이터 정보를 조회합니다.")
    @ApiResponse(responseCode = "200", description = "조회 성공", content = @Content(mediaType = "application/json", schema = @Schema(implementation = BookPageDetail.class)))
    public List<BookPageDetail> getAllDataAtPage(@PathVariable int bookId,
                                                 @PathVariable int pageNo) {
        return bookService.getAllDataAtPage(bookId, pageNo);
    }


    // bookId와 페이지번호를 이용해 해당 책의 존재하는 페이지의 배경이미지 조회
    @GetMapping("/{bookId}/pages/{pageNo}/backgrounds")
    @Operation(summary = "페이지의 배경 이미지 조회", description = "책 ID와 페이지 번호를 이용해 해당 책의 존재하는 페이지의 배경 이미지를 조회합니다.")
    @ApiResponse(responseCode = "200", description = "조회 성공", content = @Content(mediaType = "application/json", schema = @Schema(implementation = BookPageDetail.class)))
    @ResponseStatus(HttpStatus.OK)
    public List<BookPageDetail> getBackImgAtPage(@PathVariable int bookId,
                                                 @PathVariable int pageNo) {
        return bookService.getBackImgAtPage(bookId, pageNo);
    }

    // bookId와 페이지번호를 이용해 페이지에 존재하는 등장인물 조회
    @GetMapping("/{bookId}/pages/{pageNo}/characters")
    @Operation(summary = "페이지에 존재하는 등장인물 조회", description = "책 ID와 페이지 번호를 이용해 페이지에 존재하는 등장인물을 조회합니다.")
    @ApiResponse(responseCode = "200", description = "조회 성공", content = @Content(mediaType = "application/json", schema = @Schema(implementation = BookPageDetail.class)))
    @ResponseStatus(HttpStatus.OK)
    public List<BookPageDetail> getCharImgAtPage(@PathVariable int bookId,
                                                 @PathVariable int pageNo) {
        return bookService.getCharImgAtPage(bookId, pageNo);
    }


    // bookId와 페이지번호를 이용해 페이지에 존재하는 모든 스크립트 조회
    @GetMapping("/{bookId}/pages/{pageNo}/scripts")
    @Operation(summary = "페이지에 존재하는 모든 스크립트 조회", description = "책 ID와 페이지 번호를 이용해 페이지에 존재하는 모든 스크립트를 조회합니다.")
    @ApiResponse(responseCode = "200", description = "조회 성공", content = @Content(mediaType = "application/json", schema = @Schema(implementation = BookPageDetail.class)))
    @ResponseStatus(HttpStatus.OK)
    public List<BookPageDetail> getScriptsAtPage(@PathVariable int bookId,
                                                 @PathVariable int pageNo) {
        return bookService.getScriptAtPage(bookId, pageNo);
    }


    // 책 생성 API
    @PostMapping("/make/{numbers}")
    @Operation(summary = "더미 책 생성", description = "지정된 개수의 더미 책 데이터를 생성합니다.")
    @ApiResponse(responseCode = "201", description = "더미N의 이름을 가진 동화책 생성")
    @ResponseStatus(HttpStatus.CREATED)
    public void makeDummyBook(@PathVariable int numbers) {
        bookService.makeDummyBook(numbers);
    }
}
