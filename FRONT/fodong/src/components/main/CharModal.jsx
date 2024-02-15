import "./mainStyle.css"; // 모달 스타일을 정의한 CSS 파일
import React, { useState, useEffect } from "react";
import axios from "axios";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import { createGameRoomSession } from "../../api/multi";
import { multiStoryStore } from "../../store/multiStoryStore.js";

const API_URL = process.env.REACT_APP_API_URL;
const API_BASE_URL = `${API_URL}/books`;

const CharModal = ({ isOpen, closeModal, book }) => {
  const Navi = useNavigate();
  const [selectBook, setSelectBook] = useState([]);
  const accountId = localStorage.getItem("accountId");
  const token = localStorage.getItem("Token");
  const [chars, setChars] = useState([]);
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  useEffect(() => {
    if (!accountId || !book.bookId) {
      console.log("로컬에 Id저장 x 또는 bookId 없음");
      return;
    }

    axios
      .get(`${API_BASE_URL}/${book.bookId}`, config)
      .then((response) => {
        setSelectBook(response.data);
        setChars(response.data.characters);
      })
      .catch((error) => {
        console.error("서버 요청 실패:", error);
      });
  }, [accountId, token]);
  if (!isOpen) return null; // isOpen이 false이면 모달을 렌더링하지 않음

  // const handleGoMultiStory = () => {
  //   goMultiStory();
  // };
  const goMultiStory = async () => {
    // zustand 활용  중앙 상태 저장소에 sessionId 저장
    try {
      const response = await createGameRoomSession(book.bookId, token);
      console.log(response);
      // console.log("이거: " + response + "& " + response.sessionId);
      multiStoryStore.getState().setSessionId(response.sessionId);
      Navi(`/multi/${response.sessionId}`);
    } catch (error) {
      console.error("Game room session creation failed: ", error);
    }
  };

  const goSingleStory = () => {
    Navi("/storyReady");
  };

  const goTogetStory = () => {
    Navi("/album");
  };
  const goReadBook = () => {
    Navi("/readbook");
  };

  // isOpen이 true일 때 모달 컨텐츠 렌더링
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>{selectBook.title}</h3>
        {/* 캐릭터들을 쉼표로 구분하여 표시 */}
        <div>{selectBook.summary || "Loading..."}</div>
        <div>
          주인공 :{" "}
          {chars.map((character, index) => (
            <span key={index}>
              {character}
              {index === chars.length - 1 ? null : " ,"}
            </span>
          ))}
        </div>
        <div className="char-select">
          <Webcam className="web-container" />
        </div>

        <div className="enterButtons">
          <div className="enter_button" onClick={goSingleStory}>
            롤플레잉
          </div>
          <div className="enter_button" onClick={goMultiStory}>
            북놀이터
          </div>
          <div className="enter_button" onClick={goReadBook}>
            오디오북
          </div>
        </div>
        <div className="modal_button" onClick={closeModal}>
          닫기
        </div>
      </div>
    </div>
  );
};

export default CharModal;
