package com.adhd.fodong.domain.book.service;

import com.adhd.fodong.domain.book.dto.BookAllImgData;
import com.adhd.fodong.domain.book.dto.BookInfo;
import com.adhd.fodong.domain.book.dto.BookPageDetail;
import com.adhd.fodong.domain.book.dto.CharacterDetail;
import com.adhd.fodong.domain.book.entity.Book;
import com.adhd.fodong.domain.book.entity.BookPage;
import com.adhd.fodong.domain.book.entity.Character;
import com.adhd.fodong.domain.book.entity.Script;
import com.adhd.fodong.domain.book.repository.BookRepository;
import com.adhd.fodong.global.util.ConvertTool;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

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
    public List<BookInfo> getAllBookDetails() {
        // 기본 책 정보 + 최대 페이지정보, 등장인물들 데이터를 반환한다
        List<Book> allBooks = getAllBook();
        List<BookInfo> bookInfos = new ArrayList<>();
        ConvertTool convertTool = new ConvertTool();

        for (Book book : allBooks) {
            BookInfo bookInfo = new BookInfo();
            bookInfo.setBookId(book.getBookId());
            bookInfo.setTitle(book.getTitle());
            bookInfo.setSummary(book.getSummary());
            bookInfo.setPlayCnt(book.getPlayCnt());

            // png 확장자 jpg로 변경 (DB수정 귀찬항서)
            String ConvertedCover = convertTool.convertToJpg(book.getCover());
            bookInfo.setCover(ConvertedCover);

            bookInfo.setMaxPageNo(getMaxPage(book.getBookId()));

            // 등장인물 넣기
            List<CharacterDetail> characters = getCharacters(book.getBookId());
            // 캐릭터 이름만 중복 없이 저장하기 위한 Set
            Set<String> characterNames = new HashSet<>();
            for (CharacterDetail characterDetail : characters) {
                characterNames.add(characterDetail.getCharacterName());
            }
            bookInfo.setCharacters(new ArrayList<>(characterNames));

            bookInfos.add(bookInfo);
        }

        return bookInfos;
    }

    @Override
    public BookInfo getBook(int bookId) {
        Optional<Book> bookOptional = bookRepository.findBookById(bookId);
        ConvertTool convertTool = new ConvertTool();

        if (bookOptional.isPresent()) {
            Book book = bookOptional.get();
            BookInfo bookInfo = new BookInfo();

            bookInfo.setBookId(bookId);
            bookInfo.setTitle(book.getTitle());
            bookInfo.setSummary(book.getSummary());
            bookInfo.setPlayCnt(book.getPlayCnt());
            // png 확장자 jpg로 변경 (DB수정 귀찬항서)
            String ConvertedCover = convertTool.convertToJpg(book.getCover());
            bookInfo.setCover(ConvertedCover);
            bookInfo.setMaxPageNo(getMaxPage(bookId));

            // 등장인물 넣기
            List<CharacterDetail> characters = getCharacters(bookId);
            // 캐릭터 이름만 중복 없이 저장하기 위한 Set
            Set<String> characterNames = new HashSet<>();
            for (CharacterDetail characterDetail : characters) {
                characterNames.add(characterDetail.getCharacterName());
            }
            bookInfo.setCharacters(new ArrayList<>(characterNames));

            return bookInfo;
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
        List<Character> allCharacters = bookRepository.getAllCharactersByBookId(bookId);
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


//    @Override
//    public List<BookAllImgData> getBookAllImgData(int bookId) {
//        // 해당 페이지 존재하는 모든 데이터 조회
//         dataList = bookRepository.getAllImgDataByBookId(bookId);
//
//        // 데이터가 존재하는 경우, 조회된 데이터를 BookPageDetails 리스트에 추가
//        if (dataList != null && !dataList.isEmpty()) {
//            return dataList;
//        } else {
//            // 데이터가 없는 경우, 빈 리스트 반환
//            return new ArrayList<BookAllImgData>();
//        }
//    }



    @Override
    public List<BookAllImgData> bookInitRender(int bookId) {

        ArrayList<BookAllImgData> bookAllImgData = new ArrayList<>();

        List<Character> allCharactersByBookId = bookRepository.getAllCharactersByBookId(bookId);
        List<BookPage> allBackImgByBookId = bookRepository.getAllBackImgByBookId(bookId);

        // 캐릭터 이미지 저장
        for (Character character : allCharactersByBookId) {
            BookAllImgData charImages = new BookAllImgData();

            charImages.setBookId(character.getBookId());
            charImages.setPageNo(character.getPageNo());
            charImages.setCharacterId(character.getCharacterId());
            charImages.setCharacterName(character.getCharacterName());
            charImages.setCharacterImg(character.getCharacterImg());

            bookAllImgData.add(charImages);
        }

        // 배경 이미지 저장
        for (BookPage bookPage : allBackImgByBookId) {
            BookAllImgData backImages = new BookAllImgData();

            backImages.setBookId(bookPage.getBookId());
            backImages.setPageNo(bookPage.getPageNo());
            backImages.setBackImg(bookPage.getBackImg());

            bookAllImgData.add(backImages);
        }


        return bookAllImgData;
    }



    @Override
    public List<BookPageDetail> getAllDataAtPage(int bookId, int pageNo) {
        // 해당 페이지 존재하는 모든 데이터 조회
        List<BookPageDetail> dataList = bookRepository.getDataAtPageByBookIdAndPageNo(bookId, pageNo);

        // 데이터가 존재하는 경우, 조회된 데이터를 BookPageDetails 리스트에 추가
        if (dataList != null && !dataList.isEmpty()) {
            return dataList;
        } else {
            // 데이터가 없는 경우, 빈 리스트 반환
            return new ArrayList<BookPageDetail>();
        }
    }

    @Override
    public List<BookPageDetail> getBackImgAtPage(int bookId, int pageNo) {
        // 페이지의 배경이미지 조회
//        List<BookPage> backImages = bookRepository.getBackgroundByBookIdAndPageNo(bookId, pageNo);
//
//        if (backImages == null || backImages.isEmpty()) {
//            return Collections.emptyList();
//        }
//
//        return backImages.stream()
//                .map(bookPage -> new BookPageDetail.Builder()
//                        .bookId(bookPage.getBookId())
//                        .pageNo(bookPage.getPageNo())
//                        .backImg(bookPage.getBackImg())
//                        .build())
//                .collect(Collectors.toList());


//         페이지의 배경이미지 조회
        ArrayList<BookPageDetail> bookPageDetails = new ArrayList<>();
        List<BookPage> backImages = bookRepository.getBackgroundByBookIdAndPageNo(bookId, pageNo);

        for (BookPage bookPage : backImages) {
            BookPageDetail bookPageDetail = new BookPageDetail();

            bookPageDetail.setBookId(bookPage.getBookId());
            bookPageDetail.setPageNo(bookPage.getPageNo());
            bookPageDetail.setBackImg(bookPage.getBackImg());

            bookPageDetails.add(bookPageDetail);
        }

        return bookPageDetails;
    }

    @Override
    public List<BookPageDetail> getCharImgAtPage(int bookId, int pageNo) {
//        // 페이지의 등장 캐릭터 이미지 조회
//        List<BookPageDetail> bookPageDetails = new ArrayList<>();
//        List<Character> charImages = bookRepository.getCharactersByBookIdAndPageNo(bookId, pageNo);
//
//        for (Character character : charImages) {
//            BookPageDetail bookPageDetail = new BookPageDetail.Builder()
//                    .bookId(character.getBookId())
//                    .pageNo(character.getPageNo())
//                    .characterId(character.getCharacterId())
//                    .characterName(character.getCharacterName())
//                    .characterImg(character.getCharacterImg())
//                    .build();
//
//            bookPageDetails.add(bookPageDetail);
//        }
//
//        return bookPageDetails;


        // 페이지의 등장 캐릭터 이미지 조회
        ArrayList<BookPageDetail> bookPageDetails = new ArrayList<>();
        List<Character> charImages = bookRepository.getCharactersByBookIdAndPageNo(bookId, pageNo);

        for (Character character : charImages) {
            BookPageDetail bookPageDetail = new BookPageDetail();

            bookPageDetail.setBookId(character.getBookId());
            bookPageDetail.setPageNo(character.getPageNo());
            bookPageDetail.setCharacterId(character.getCharacterId());
            bookPageDetail.setCharacterName(character.getCharacterName());
            bookPageDetail.setCharacterImg(character.getCharacterImg());

            bookPageDetails.add(bookPageDetail);
        }

        return bookPageDetails;
    }

    @Override
    public List<BookPageDetail> getScriptAtPage(int bookId, int pageNo) {
        // 페이지의 스크립트 조회
//        List<BookPageDetail> bookPageDetails = new ArrayList<>();
//        List<Script> scripts = bookRepository.getScriptsByBookIdAndPageNo(bookId, pageNo);
//
//        for (Script script : scripts) {
//            BookPageDetail bookPageDetail = new BookPageDetail.Builder()
//                    .bookId(script.getBookId())
//                    .pageNo(script.getPageNo())
//                    .person(script.getPerson())
//                    .context(script.getContext())
//                    .build();
//
//            bookPageDetails.add(bookPageDetail);
//        }
//        return bookPageDetails;

//        // 페이지의 스크립트 조회
        ArrayList<BookPageDetail> bookPageDetails = new ArrayList<>();
        List<Script> scripts = bookRepository.getScriptsByBookIdAndPageNo(bookId, pageNo);

        for (Script script : scripts) {
            BookPageDetail bookPageDetail = new BookPageDetail();

            bookPageDetail.setBookId(script.getBookId());
            bookPageDetail.setPageNo(script.getPageNo());
            bookPageDetail.setPerson(script.getPerson());
            bookPageDetail.setContext(script.getContext());

            bookPageDetails.add(bookPageDetail);
        }
        return bookPageDetails;
    }

    // 책 생성 API
    @Override
    public void makeDummyBook(int numbers) {
        Random random = new Random();

        for (int i = 2; i <= numbers; i++) {
            Book newBook = new Book();

            newBook.setTitle("더미" + i);
            newBook.setSummary(i + "번 더미의 요약");
            newBook.setPlayCnt(1 + random.nextInt(200)); // 1부터 200 사이의 랜덤한 숫자
            newBook.setCover("img/dummy_cover/" + i + ".png");

            bookRepository.saveBook(newBook);
        }
    }
}
