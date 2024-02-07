import React, { useState } from "react";
// import Cams from "../components/storyTelling/Cams";
import Script from "../components/storyTelling/Script";
import Page1 from "../components/storyTelling/Page1";
import { Route, Routes } from "react-router-dom";
import Grid from "@mui/material/Grid";
import storyStore from "../store/storyStore";

const StoryTelling = () => {
  const data = storyStore((state) => state.data);
  console.log(data);
  const [currentPage, setCurrentPage] = useState(1);
  const minPage = 1;
  const maxPage = Math.max(...data.map((item) => item.pageNo));
  const currentPageData = data.filter((item) => item.pageNo === currentPage);

  const prevPage = () => {
    setCurrentPage((current) => Math.max(current - 1, minPage));
  };

  const nextPage = () => {
    setCurrentPage((current) => Math.min(current + 1, maxPage));
  };

  

  return (
    <div>
      <div>
        {currentPageData.map((item, index) => (
          <div key={item.characterId + "-" + item.pageNo}>
            <p>Character Name: {item.characterName}</p>
            {item.backImg && <img src={item.backImg} alt={`Background for page ${item.pageNo}`} />}
            {/* 여기에 더 많은 정보를 출력할 수 있습니다 */}
          </div>
        ))}
      </div>
      <div>
        {/* 이전 페이지 버튼 */}
        <button onClick={prevPage} disabled={currentPage === minPage}>
          Previous Page
        </button>
        {/* 다음 페이지 버튼 */}
        <button onClick={nextPage} disabled={currentPage === maxPage}>
          Next Page
        </button>
      </div>
    </div>
  );
};

const mainStyle = {
  padding: "100px",
  backgroundColor: "#f0e68c",
  height: "100vh",
};

const script = {
  border: "1px solid ",
  margin: "2%",
  maxWidth: "100%",
  borderRadius: "18px",
};

export default StoryTelling;
