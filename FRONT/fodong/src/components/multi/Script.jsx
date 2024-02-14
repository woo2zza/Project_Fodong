import React, { useEffect, useState, useCallback } from "react";

import "../storyTelling/StoryTelling.css";
import DummyScript from "../storyTelling/DummyScript.jsx";

import { useMultiStoryContext } from "../../contexts/MultiStoryContext.js";
import { multiStoryStore } from "../../store/multiStoryStore.js";

const Script = () => {
  const sendChangePageRequest = useMultiStoryContext();

  const { page, scriptIndex } = multiStoryStore();

  // const [scriptIndex, setScriptIndex] = useState(0);
  const [script, setScript] = useState("");

  useEffect(() => {
    if (DummyScript[page - 1] && DummyScript[page - 1][scriptIndex]) {
      setScript(DummyScript[page - 1][scriptIndex].text);
    }
    console.log(scriptIndex);
  }, [page, scriptIndex]);

  // const handleNextScript = () => {
  //   const scriptLength = DummyScript[page - 1].length;
  //   if (scriptIndex + 1 < scriptLength) {
  //     // setScriptIndex((idx) => idx + 1);
  //     sendChangePageRequest("nextScript");
  //   } else if (
  //     page === DummyScript.length &&
  //     scriptIndex === scriptLength - 1
  //   ) {
  //     // sendChangePageRequest("nextPage");
  //   } else if (page < DummyScript.length) {
  //     // const nextPage = page + 1;
  //     // changePage(nextPage);
  //     // setScriptIndex(0);
  //     // setScript(DummyScript[nextPage - 1][0].text);
  //     sendChangePageRequest("nextPage");
  //     // sendChangePageRequest("firstScript");
  //   }
  // };

  const handleNextScript = useCallback(() => {
    const scriptLength = DummyScript[page - 1].length;
    if (scriptIndex + 1 < scriptLength) {
      // setScriptIndex((idx) => idx + 1);
      sendChangePageRequest("nextScript");
    } else if (
      page === DummyScript.length &&
      scriptIndex === scriptLength - 1
    ) {
      // sendChangePageRequest("nextPage");
    } else if (page < DummyScript.length) {
      // const nextPage = page + 1;
      // changePage(nextPage);
      // setScriptIndex(0);
      // setScript(DummyScript[nextPage - 1][0].text);
      sendChangePageRequest("nextPage");
      // sendChangePageRequest("firstScript");
    }
  }, [page, scriptIndex, sendChangePageRequest]);

  // const handleNextPage = () => {
  //   // const nextPage = page + 1;
  //   const nextPage = page + 1;
  //   // 더미 lenght가 3이라서 이렇게 설정
  //   const maxLength = 3;
  //   if (nextPage <= maxLength) sendChangePageRequest("nextPage");
  // };

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
