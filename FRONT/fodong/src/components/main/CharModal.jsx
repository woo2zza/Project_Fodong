// CharModal.jsx
import React from "react";
import "./mainStyle.css"; // 모달 스타일을 정의한 CSS 파일

const CharModal = ({ isOpen, closeModal, book }) => {
  if (!isOpen) return null; // isOpen이 false이면 모달을 렌더링하지 않음

  // isOpen이 true일 때 모달 컨텐츠 렌더링
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{book.title}</h2>
        <p>등장인물: {book.characters}</p>
        <p>설명: {book.description}</p>
        <button onClick={closeModal}>닫기</button>
      </div>
    </div>
  );
};

export default CharModal;
