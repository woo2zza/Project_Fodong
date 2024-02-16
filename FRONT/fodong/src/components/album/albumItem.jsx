import React, { useState } from "react";
import "./album.css";
import Modal from "./Modal";

function AlbumItem({ album }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="item_bg">
      <div
        className="albumItem"
        onClick={openModal}
        style={{ backgroundImage: `url(${album.cover})` }}
      >
        {/* 모달 컴포넌트에 isOpen, close 함수, 동영상 URL, 타이틀 전달 */}
        <Modal
          isOpen={isOpen}
          close={closeModal}
          videos={[album.recordingUrl]}
          title={album.title}
        />

        <div className="albumOverlay">
          <h2 className="albumTitle">{album.title}</h2>
        </div>
      </div>
    </div>
  );
}

export default AlbumItem;
