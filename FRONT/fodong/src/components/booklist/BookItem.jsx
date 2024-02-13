import React from "react";
import CharModal from "../main/CharModal";

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
        <h3>{book.characters || "등장인물 정보 없음"}</h3>
      </div>
    </li>
  );
}

export default BookItem;
