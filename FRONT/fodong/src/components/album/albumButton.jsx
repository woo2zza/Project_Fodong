import { useState, useEffect } from "react";
import axios from "axios";
import "./album.css";
import AlbumItem from "./albumItem";
import { userStore } from "../../store/userStore";

const API_URL = process.env.REACT_APP_API_URL;
const API_BASE_URL = `${API_URL}/album`;

const AlbumButton = () => {
  const [albums, setAlbums] = useState([]);
  const useProfileId = userStore((state) => state.profileId);
  useEffect(() => {
    albumList();
  }, []);

  const token = localStorage.getItem("Token");
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const albumList = () => {
    const accountId = localStorage.getItem("accountId");

    if (!accountId) {
      console.log("No accountId available");
      return;
    }
    axios
      .get(`${API_BASE_URL}/${useProfileId}`, config)
      .then((response) => {
        setAlbums(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("서버 요청 실패 :", error);
      });
  };
  return (
    <div className="albumContainer">
      {albums.map((album) => (
        <AlbumItem key={album.bookId} album={album} />
      ))}
    </div>
  );
};

export default AlbumButton;
