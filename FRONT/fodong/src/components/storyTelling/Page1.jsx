import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./StoryTelling.css";
import DummyScript from "./DummyScript";
import { Route, Routes } from "react-router-dom";
import Face from "../face/Face";

import RecordRTC from "recordrtc";

const Page = ({ onPageChange }) => {
  const [recorder, setRecorder] = useState(null);

  const [imageSrc, setImageSrc] = useState("");
  const { page: pageParam } = useParams();
  const page = parseInt(pageParam, 10) || 1;
  const navigate = useNavigate();

  useEffect(() => {
    console.log(15, pageParam);
  }, [pageParam]);

  const backgroundStyle = {
    flexGrow: "1",
    order: "2",
    width: "100vw",
    height: "85vh",
    backgroundImage: `url(${imageSrc})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  const handleNextPage = () => {
    const nextPage = page + 1;
    console.log(28, page);
    if (nextPage <= DummyScript.length) {
      navigate(`/storytelling/${nextPage}`);
      // setPage(nextPage);
      onPageChange();
    }
  };
  const handleBeforePage = () => {
    const BeforePage = page - 1;
    console.log(36, page);
    if (BeforePage >= 1) {
      navigate(`/storytelling/${BeforePage}`);
      // setPage(BeforePage);
      onPageChange();
    }
  };
  // ;}

  // 녹화 시작 함수
  const startRecording = async () => {
    try {
      const mediaConstraints = { video: true, audio: true }; // 오디오 추가 가능
      const stream = await navigator.mediaDevices.getDisplayMedia(
        mediaConstraints
      );
      const newRecorder = new RecordRTC(stream, {
        type: "video",
        mimeType: "video/webm",
      });
      newRecorder.startRecording();
      setRecorder(newRecorder);
    } catch (error) {
      console.error("녹화 시작 중 오류 발생:", error);
    }
  };

  // 녹화 중지 및 저장 함수
  const stopRecording = () => {
    if (recorder) {
      recorder.stopRecording(() => {
        const blob = recorder.getBlob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        a.href = url;
        a.download = "recorded_video.webm";
        a.click();
        window.URL.revokeObjectURL(url);
      });
    }
  };

  return (
    <div
      style={{
        ...backgroundStyle,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <button
        style={{
          fontSize: "3rem",
          padding: "10px 20px",
          cursor: "pointer",
          outline: "none",
          order: "1",
          background: "none",
          border: "none",
          color: "red",
          fontWeight: "700",
        }}
        onClick={handleBeforePage}
      >
        {"<"}
      </button>

      <Routes>
        <Route path="/" element={<Face />} />
      </Routes>
      <button onClick={startRecording}>녹화 시작</button>
      <button onClick={stopRecording}>녹화 중지</button>
      <button
        style={{
          fontSize: "3rem",
          padding: "10px 20px",
          cursor: "pointer",
          outline: "none",
          order: "3",
          color: "red",
          fontWeight: "700",
          background: "none",
          border: "none",
        }}
        onClick={handleNextPage}
      >
        {">"}
      </button>
    </div>
  );
};

export default Page;
