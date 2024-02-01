package com.adhd.fodong.domain.book.service;

import com.adhd.fodong.domain.book.dto.BookDetail;
import com.adhd.fodong.domain.book.dto.CharacterDetail;
import com.adhd.fodong.domain.book.entity.Book;
import com.adhd.fodong.domain.book.entity.Character;
import com.adhd.fodong.domain.book.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;

    @Override
    public List<Book> getAllBook() {
        // 존재하는 모든 책의 정보를 가져온다
        // bookId, 제목, 요약, 구현횟수, 커버이미지
        List<Book> allBook = bookRepository.findAllBook();
        return allBook;
    }

    @Override
    public List<BookDetail> getAllBookDetails() {
        // 기본 책 정보 + 최대 페이지정보, 등장인물들 데이터를 반환한다
        List<Book> allBooks = getAllBook();
        List<BookDetail> bookDetails = new ArrayList<>();

        for (Book book : allBooks) {
            BookDetail bookDetail = new BookDetail();
            bookDetail.setBookId(book.getBookId());
            bookDetail.setTitle(book.getTitle());
            bookDetail.setSummary(book.getSummary());
            bookDetail.setPlayCnt(book.getPlayCnt());
            bookDetail.setCover(book.getCover());
            bookDetail.setMaxPageNo(getMaxPage(book.getBookId()));
            // 추후에 최대 페이지 정보
            bookDetails.add(bookDetail);
        }

        return bookDetails;
    }

    @Override
    public BookDetail getBook(int bookId) {
        Optional<Book> bookOptional = bookRepository.findBookById(bookId);

        if (bookOptional.isPresent()) {
            Book book = bookOptional.get();
            BookDetail bookDetail = new BookDetail();

            bookDetail.setBookId(bookId);
            bookDetail.setTitle(book.getTitle());
            bookDetail.setSummary(book.getSummary());
            bookDetail.setPlayCnt(book.getPlayCnt());
            bookDetail.setCover(book.getCover());
            bookDetail.setMaxPageNo(getMaxPage(bookId));

            return bookDetail;
        } else {
            throw new RuntimeException("찾으려는 책이 없음");
        }
    }

    @Override
    public Integer getMaxPage(int bookId) {
        int countPage = bookRepository.countPagesByBookId(bookId);
        return countPage;
    }

    @Override
    public List<CharacterDetail> getCharacters(int bookId) {
        // bookId에서 나오는 모든 캐릭터 정보 조회
        List<Character> allCharacters = bookRepository.findAllCharacters(bookId);
        List<CharacterDetail> characterDetails = new ArrayList<>();

        for (Character character : allCharacters) {
            CharacterDetail characterDetail = new CharacterDetail();
            characterDetail.setCharacterId(character.getCharacterId());
            characterDetail.setCharacterName(character.getCharacterName());
            characterDetail.setCharacterImg(character.getCharacterImg());

            characterDetails.add(characterDetail);
        }

        return characterDetails;
    }


}
