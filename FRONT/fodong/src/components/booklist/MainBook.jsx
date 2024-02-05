import React, { useState, useEffect } from "react";
import "./bookList.css";
import axios from "axios";
import BookItem from "./BookItem";
import dummyimg1 from "../../img/dummy_cover/11.jpg";
import dummyimg2 from "../../img/dummy_cover/2.jpg";
import dummyimg3 from "../../img/dummy_cover/3.jpg";
import dummyimg4 from "../../img/dummy_cover/4.jpg";
import dummyimg5 from "../../img/dummy_cover/5.jpg";
import dummyimg6 from "../../img/dummy_cover/6.jpg";
import dummyimg7 from "../../img/dummy_cover/7.jpg";
import dummyimg8 from "../../img/dummy_cover/8.jpg";
import dummyimg9 from "../../img/dummy_cover/9.jpg";
import dummyimg10 from "../../img/dummy_cover/10.jpg";

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
      cover: dummyimg1,
      maxPageNo: 3,
      characters: "개미, 베짱이",
    },
    {
      bookId: 2,
      title: "백설공주",
      summary: "요약 나중에 추가",
      playCnt: 0,
      cover: dummyimg2,
      maxPageNo: 3,
      characters: "난쟁이, 난쟁이2, ",
    },
    {
      bookId: 3,
      title: "더미3",
      summary: "더미데이터",
      playCnt: 12,
      cover: dummyimg3,
      maxPageNo: 0,
      characters: null,
    },
    {
      bookId: 4,
      title: "더미4",
      summary: "더미데이터",
      playCnt: 12,
      cover: dummyimg4,
      maxPageNo: 0,
      characters: null,
    },
    {
      bookId: 5,
      title: "더미5",
      summary: "더미데이터",
      playCnt: 12,
      cover: dummyimg5,
      maxPageNo: 0,
      characters: null,
    },
    {
      bookId: 6,
      title: "더미6",
      summary: "더미데이터",
      playCnt: 12,
      cover: dummyimg6,
      maxPageNo: 0,
      characters: null,
    },
    {
      bookId: 7,
      title: "더미7",
      summary: "더미데이터",
      playCnt: 12,
      cover: dummyimg7,
      maxPageNo: 0,
      characters: null,
    },
    {
      bookId: 8,
      title: "더미8",
      summary: "더미데이터",
      playCnt: 12,
      cover: dummyimg8,
      maxPageNo: 0,
      characters: null,
    },
    {
      bookId: 9,
      title: "더미9",
      summary: "더미데이터",
      playCnt: 12,
      cover: dummyimg9,
      maxPageNo: 0,
      characters: null,
    },
    {
      bookId: 10,
      title: "더미10",
      summary: "더미데이터",
      playCnt: 12,
      cover: dummyimg10,
      maxPageNo: 0,
      characters: null,
    },
  ];

  return (
    <div className="booklist_body">
      <div className="booklist_name">
        <h>BookList</h>
      </div>
      <div className="booklist_container">
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
          {items.map((book) => (
            <BookItem key={book.bookId} book={book} viewMode={viewMode} />
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;
