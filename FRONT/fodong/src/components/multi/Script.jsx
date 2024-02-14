import React, { useEffect, useState } from "react";
import "../storyTelling/StoryTelling.css";
import DummyScript from "../storyTelling/DummyScript.jsx";

const Script = ({ page, changePage }) => {
  const [scriptIndex, setScriptIndex] = useState(0);
  const [script, setScript] = useState();

  useEffect(() => {
    if (DummyScript[page - 1] && DummyScript[page - 1][scriptIndex]) {
      setScript(DummyScript[page - 1][scriptIndex].text);
    }
  }, [page, scriptIndex]);

  useEffect(() => {
    setScriptIndex(0);
  }, [page]);

  const handleNextScript = () => {
    const scriptLength = DummyScript[page - 1].length;
    if (scriptIndex + 1 < scriptLength) {
      setScriptIndex((idx) => idx + 1);
    } else if (
      page === DummyScript.length &&
      scriptIndex === scriptLength - 1
    ) {
    } else if (page < DummyScript.length) {
      const nextPage = page + 1;
      changePage(nextPage);
      setScriptIndex(0);
      setScript(DummyScript[nextPage - 1][0].text);
    }
  };

  return (
    <div className="script-container">
      <div className="script-text-container">
        <h1 className="script_text">{script}</h1>
      </div>
      <div className="bottom" style={{ margin: "0px" }}>
        <button className="story_button" onClick={handleNextScript}>
          다음
        </button>
      </div>
    </div>
  );
};

export default Script;
