import React from "react";
import "./album.css"; // CSS 파일 경로 확인 필요

function Modal({ isOpen, close, videos, title }) {
  if (!isOpen) return null;

  const handleVideoEnd = () => {
    close();
  };
  return (
    <div className="modalOverlay" onClick={close}>
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        {videos.map((videoUrl, index) => (
          <video
            key={index}
            controls
            src={videoUrl}
            onEnded={handleVideoEnd}
          ></video>
        ))}
      </div>
    </div>
  );
}

export default Modal;
