import React from "react";
import CharModal from "../main/CharModal";

function BookItem({ book, viewMode }) {
  return (
    <li className={`cardItem ${viewMode}`}>
      <img
        src={`${book.cover}`}
        alt={`${book.title} cover`}
        className="bookCover"
      />
      <div className="textOverlay">
        <h2>{book.title}</h2>
        <p>{book.characters || "등장인물 정보 없음"}</p>
      </div>
    </li>
  );
}

export default BookItem;
