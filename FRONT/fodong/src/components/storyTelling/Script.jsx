import { Button } from "../Common";
import React, { useState } from "react";
import "./StoryTelling.css";

const Script = () => {
  const [script, setScript] = useState("스크립트 시작");

  const handleNextScript = () => {
    setScript("다음 페이지의 스크립트 내용");
  };

  return (
    <div className="main-content">
      <div className="script-container">
        <h1 className="script-text">{script}</h1>
        <div className="bottom">
          <button className="story_button" onClick={handleNextScript}>
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default Script;
