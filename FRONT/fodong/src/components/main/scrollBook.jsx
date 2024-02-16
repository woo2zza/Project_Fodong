import React, { useState, useEffect } from "react";
import CharModal from "./CharModal";
import "./mainStyle.css";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
const API_BASE_URL = `${API_URL}/books`;

const ScrollBook = () => {
  const [books, setBooks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [selectedBook, setSelectedBook] = useState({}); // 선택된 동화책

  const accountId = localStorage.getItem("accountId");
  const token = localStorage.getItem("Token");
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  useEffect(() => {
    if (!accountId) {
      console.log("로컬에 Id저장 x");
      return;
    }

    axios
      .get(`${API_BASE_URL}`, config)
      .then((response) => {
        setBooks(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("서버 요청 실패:", error);
      });
  }, [accountId, token]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % books.length);
    }, 4000);
    return () => clearTimeout(timer);
  }, [currentIndex, books.length]);

  const openModal = (Id) => {
    const bookData = books.find((book, idx) => book.bookId === Id);
    if (bookData) {
      setSelectedBook(bookData);
      setIsModalOpen(true);
    }
  };

  const goToNextBook = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % books.length);
  };

  const goToPrevBook = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + books.length) % books.length
    );
  };

  return (
    <div className="scroll_container">
      <button onClick={goToPrevBook} className="preButton">
        <i class="fa-solid fa-angle-left"></i>
      </button>

      <div className="slider-container">
        {books.map((book, index) => (
          <div
            key={index}
            className={`slide ${index === currentIndex ? "active" : ""}`}
            style={{ backgroundImage: `url(${book.cover})` }}
            onClick={() => openModal(book.bookId)}
          >
            <div className="book-info">
              <h3>{book.title}</h3>
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
      <button onClick={goToNextBook} className="goButton">
        <i class="fa-solid fa-angle-right"></i>
      </button>
    </div>
  );
};

export default ScrollBook;
