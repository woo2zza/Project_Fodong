import React from "react";
import AlbumButton from "../components/album/albumButton";
import AlbumTitle from "../components/album/albumTitle";
import "./pages.css";
const Album = () => {
  return (
    <div className="Album_container">
      <AlbumTitle />
      <AlbumButton />
    </div>
  );
};

export default Album;
