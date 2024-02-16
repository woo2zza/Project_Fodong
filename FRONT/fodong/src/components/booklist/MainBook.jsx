import React, { useState, useEffect } from "react";
import CharModal from "../main/CharModal";
import "./bookList.css";
import Logo from "../../img/logo.png";
import axios from "axios";
import BookItem from "./BookItem";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;
const API_BASE_URL = `${API_URL}`;
function App() {
  const Mainnavi = useNavigate();
  const [viewMode, setViewMode] = useState("listView");
  const [profiles, setProfiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [selectedBook, setSelectedBook] = useState(null); // 선택된 책

  const token = localStorage.getItem("Token");
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };
  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = () => {
    axios
      .get(`${API_BASE_URL}/books`, config)
      .then((response) => {
        setProfiles(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("서버 요청 실패:", error);
      });
  };

  const openModal = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const Mainbutton = () => {
    Mainnavi("/main");
  };
  return (
    <div className="booklist_body">
      <div>
        <img
          className="logo_container"
          src={Logo}
          alt="logo"
          onClick={Mainbutton}
          style={{
            width: "80px",
          }}
        />
      </div>
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
          {profiles.map((book) => (
            <BookItem
              key={book.bookId}
              book={book}
              viewMode={viewMode}
              onBookSelect={openModal}
            />
          ))}
        </ul>
      </section>
      {isModalOpen && (
        <CharModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          book={selectedBook}
        />
      )}
    </div>
  );
}

export default App;
