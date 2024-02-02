import React, { useState, useEffect } from "react";
import "./bookList.css";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
const API_BASE_URL = `${API_URL}`;
function App() {
  const [viewMode, setViewMode] = useState("listView");
  const [profiles, setProfiles] = useState([]);
  const token = localStorage.getItem("Token");
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };
  // useEffect(() => {
  //   fetchProfiles();
  // }, []);

  // const fetchProfiles = () => {
  //   axios
  //     .get(`${API_BASE_URL}/books`, config)
  //     .then((response) => {
  //       setProfiles(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("서버 요청 실패:", error);
  //     });
  // };
  const items = [
    {
      bookId: 1,
      title: "개미와 베짱이",
      summary: "요약 나중에 추가",
      playCnt: 0,
      cover: "src/main/resources/images/antstory/cover_antstory.png\r\n",
      maxPageNo: 3,
      characters: null,
    },
    {
      bookId: 2,
      title: "백설공주",
      summary: "요약 나중에 추가",
      playCnt: 0,
      cover: "src/main/resources/images/antstory/cover_antstory.png\r\n",
      maxPageNo: 3,
      characters: null,
    },
    {
      bookId: 3,
      title: "더미3",
      summary: "더미데이터",
      playCnt: 12,
      cover: "src/main/resources/images/dummy_cover/2.png\r\n",
      maxPageNo: 0,
      characters: null,
    },
    {
      bookId: 4,
      title: "더미4",
      summary: "더미데이터",
      playCnt: 12,
      cover: "src/main/resources/images/dummy_cover/2.png\r\n",
      maxPageNo: 0,
      characters: null,
    },
    {
      bookId: 5,
      title: "더미5",
      summary: "더미데이터",
      playCnt: 12,
      cover: "src/main/resources/images/dummy_cover/2.png\r\n",
      maxPageNo: 0,
      characters: null,
    },
    {
      bookId: 6,
      title: "더미6",
      summary: "더미데이터",
      playCnt: 12,
      cover: "src/main/resources/images/dummy_cover/2.png\r\n",
      maxPageNo: 0,
      characters: null,
    },
    {
      bookId: 7,
      title: "더미7",
      summary: "더미데이터",
      playCnt: 12,
      cover: "src/main/resources/images/dummy_cover/2.png\r\n",
      maxPageNo: 0,
      characters: null,
    },
    {
      bookId: 8,
      title: "더미8",
      summary: "더미데이터",
      playCnt: 12,
      cover: "src/main/resources/images/dummy_cover/2.png\r\n",
      maxPageNo: 0,
      characters: null,
    },
    {
      bookId: 9,
      title: "더미9",
      summary: "더미데이터",
      playCnt: 12,
      cover: "src/main/resources/images/dummy_cover/2.png\r\n",
      maxPageNo: 0,
      characters: null,
    },
    {
      bookId: 10,
      title: "더미10",
      summary: "더미데이터",
      playCnt: 12,
      cover: "src/main/resources/images/dummy_cover/2.png\r\n",
      maxPageNo: 0,
      characters: null,
    },
  ];

  return (
    <div>
      <div>
        <input
          type="radio"
          name="viewSwitcher"
          id="listView"
          value="listView"
          checked={viewMode === "listView"}
          onChange={() => setViewMode("listView")}
        />
        <label htmlFor="listView">List</label>

        <input
          type="radio"
          name="viewSwitcher"
          id="gridView"
          value="gridView"
          checked={viewMode === "gridView"}
          onChange={() => setViewMode("gridView")}
        />
        <label htmlFor="gridView">Grid</label>
      </div>

      <section className={`viewPaper viewShadowLarge ${viewMode}`}>
        <ul className={`cardListView ${viewMode}`}>
          {items.map((profile) => (
            <li key={profile.bookId} className="cardItem">
              <h2>{profile.title}</h2>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;
