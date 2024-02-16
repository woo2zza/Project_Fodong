import React from "react";
import CharModal from "../main/CharModal";
import "./bookList.css";

function BookItem({ book, viewMode, onBookSelect }) {
  const handleBookClick = () => {
    if (onBookSelect) {
      onBookSelect(book);
    }
  };

  return (
    <li className={`cardItem ${viewMode}`} onClick={handleBookClick}>
      <img
        src={`${book.cover}`}
        alt={`${book.title} cover`}
        className="bookCover"
      />
      <div className="textOverlay">
        <h1>{book.title}</h1>
      </div>
    </li>
  );
}

export default BookItem;
