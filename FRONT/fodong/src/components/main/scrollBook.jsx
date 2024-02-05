import React, { useState, useEffect } from "react";
import CharModal from "./CharModal";
import "./mainStyle.css";
import Image1 from "./dummy_cover/2.png";
import Image2 from "./dummy_cover/3.png";
import Image3 from "./dummy_cover/4.png";
import Image4 from "./dummy_cover/5.png";
import Image5 from "./dummy_cover/6.png";
import Image6 from "./dummy_cover/7.png";

const books = [
  {
    id: 1,
    image: Image1,
    title: "토끼와 호랑이",
    characters: "토끼, 호랑이",
    description: "호랑이와 토끼의 이야기",
  },
  {
    id: 2,
    image: Image2,
    title: "개구리",
    characters: "개구리",
    description: "개구리의 이야기",
  },
  {
    id: 3,
    image: Image3,
    title: "선녀와 나무꾼",
    characters: "선녀, 나무꾼",
    description: "선녀와 나무꾼의 이야기",
  },
  {
    id: 4,
    image: Image4,
    title: "호랑이와 감",
    characters: "감, 호랑이",
    description: "호랑이와 감의 이야기",
  },
  {
    id: 5,
    image: Image5,
    title: "견우와 직녀",
    characters: "견우, 직녀, 까마귀",
    description: "견우와 직녀의 이야기",
  },
  {
    id: 6,
    image: Image6,
    title: "이상한 나라의 앨리스",
    characters: "앨리스",
    description: "이상한 나라의 앨리스의 이야기",
  },
];
function ScrollBook() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [selectedBook, setSelectedBook] = useState({}); // 선택된 동화책

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % books.length);
    }, 3000);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const openModal = (bookId) => {
    console.log(bookId); // 로그 출력
    const bookData = books.find((book) => book.id === bookId);
    if (bookData) {
      setSelectedBook(bookData);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="slider-container">
      {books.map((book, index) => (
        <div
          key={index}
          className={`slide ${index === currentIndex ? "active" : ""}`}
          style={{ backgroundImage: `url(${book.image})` }}
          onClick={() => openModal(book.id)}
        >
          <div className="book-info">
            <h3>{book.title}</h3>
            <p>등장인물 : {book.characters}</p>
          </div>
        </div>
      ))}
      {isModalOpen && (
        <CharModal
          isOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          book={selectedBook}
        />
      )}
    </div>
  );
}
export default ScrollBook;
