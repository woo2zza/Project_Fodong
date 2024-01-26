// import { Button } from "../Common";
import React, { useEffect, useState } from "react";
import "./StoryTelling.css";
import DummyScript from "./DummyScript";
import { useParams } from "react-router-dom";

const Script = () => {
  const [page, setPage] = useState(useParams().page);
  const [scriptIndex, setScriptIndex] = useState(0);
  console.log(page);
  const [script, setScript] = useState(DummyScript[page - 1][scriptIndex].text);

  useEffect(() => {
    setScript(DummyScript[page - 1][scriptIndex].text);
  }, [scriptIndex, page]);

  // idx+1 < maxlength-1 ? idx+1 : nextpage
  const handleNextScript = () => {
    const scriptLength = DummyScript[page - 1].length;

    if (scriptIndex + 1 < scriptLength) {
      setScriptIndex((idx) => idx + 1);
    }
  };

  console.log(script);
  return (
    <div className="main-content">
      <div className="script-container">
        <div className="script-text-container">
          <h1 className="script-text">{script}</h1>
        </div>
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
