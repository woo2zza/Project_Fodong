import React from "react";
import "./album.css"; // CSS 파일 경로 확인 필요

function Modal({ isOpen, close, videos, title }) {
  if (!isOpen) return null;

  return (
    <div className="modalOverlay" onClick={close}>
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        {videos.map((videoUrl, index) => (
          <video
            key={index}
            controls
            src={videoUrl}
            style={{ marginBottom: "10px" }}
          >
            Your browser does not support the video tag.
          </video>
        ))}
        <button onClick={close}>Close</button>
      </div>
    </div>
  );
}

export default Modal;
