import React from "react";
import "./album.css"; // Ensure the CSS path is correct

function AlbumItem({ album }) {
  return (
    <div className="item_bg">
      <div className="albumItem">
        <video src={album.recordingUrl}></video>
        <div className="albumOverlay">
          <h2 className="albumTitle">{album.title}</h2>
        </div>
      </div>
    </div>
  );
}

export default AlbumItem;
