import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./StoryTelling.css";
import DummyScript from "./DummyScript";
import { Route, Routes } from "react-router-dom";
import Face from "../face/Face";
import StoryEndModal from "./StoryEndModal";
import RecordRTC from "recordrtc";

const getCharacterStyles = (page, width) => {
  const baseStyle = {
    position: "absolute",
    transition: "all 0.3s ease", // 애니메이션 효과 추가
  };

  const styles = {
    1: {
      antCharater: {
        ...baseStyle,
        bottom: "0px",
        right: "10%",
      },
      grasshopperCharater: {
        ...baseStyle,
        bottom: "0px",
        left: "10%",
      },
    },
    2: {
      antCharater: {
        ...baseStyle,
        bottom: "-5%",
        right: "2%",
      },
      grasshopperCharater: {
        ...baseStyle,
        bottom: "0px",
        left: "10%",
      },
    },
    3: {
      antCharater: {
        ...baseStyle,
        bottom: "0px",
        left: "10%",
      },
      grasshopperCharater: {
        ...baseStyle,
        bottom: "0px",
        right: "10%",
      },
    },
    // 다른 페이지에 대한 스타일을 계속 추가
  };

  return styles[page] || {};
};

const Page = ({ onPageChange }) => {
  const [recorder, setRecorder] = useState(null);
  const [imageSrc, setImageSrc] = useState("");
  const { page: pageParam } = useParams();
  const page = parseInt(pageParam, 10) || 1;
  const { antCharater, grasshopperCharater } = getCharacterStyles(page);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 추가

  const [activeVideoStream, setActiveVideoStream] = useState(null);
  const [activeAudioStream, setActiveAudioStream] = useState(null);
  //   let activeVideoStream = null;
  // let activeAudioStream = null;

  useEffect(() => {
    // console.log(15, pageParam);
    const imgeUrl = require(`../../../public/img/antstory/background/${pageParam}.jpg`);
    setImageSrc(imgeUrl);
  }, [pageParam]);

  const antSrc = require(`../../../public/img/antstory/character/ant/${pageParam}.jpg`);

  const grasshopperSrc = require(`../../../public/img/antstory/character/grasshopper/${pageParam}.jpg`);

  const backgroundStyle = {
    flexGrow: "1",
    order: "2",
    width: "100vw",
    height: "85vh",
    backgroundImage: `url(${imageSrc})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "relative",
  };

  const buttonStyle = (direction) => ({
    fontSize: "3rem",
    padding: "10px 20px",
    cursor: "pointer",
    outline: "none",
    background: "none",
    border: "none",
    color: "red",
    fontWeight: "700",
    position: "absolute", // 절대 위치 사용
    top: "50%", // 화면의 가운데에 위치
    transform: "translateY(-50%)", // 정확히 중앙에 위치하기 위해
    [direction]: "20px", // direction에 따라 left 또는 right 위치 지정
    zIndex: 1, // 우선 순위 설정
  });

  const handleNextPage = () => {
    const nextPage = page + 1;
    // console.log(28, page);
    if (nextPage <= DummyScript.length) {
      navigate(`/storytelling/${nextPage}`);
      // setPage(nextPage);
      onPageChange();
    } else {
      setIsModalOpen(true);
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

  const startRecording = async () => {
    try {
      const videoStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      const audioStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      // 오디오 트랙을 비디오 스트림에 추가합니다.
      audioStream
        .getAudioTracks()
        .forEach((track) => videoStream.addTrack(track));

      // 현재 활성화된 비디오 스트림과 오디오 스트림을 각각 저장합니다.
      setActiveVideoStream(videoStream);
      setActiveAudioStream(audioStream);
      //     activeAudioStream = audioStream;
      //  console.log(activeVideoStream)
      //  console.log(activeAudioStream)
      const newRecorder = new RecordRTC(videoStream, {
        type: "video",
        mimeType: "video/webm;codecs=vp8,opus",
      });
      newRecorder.startRecording();
      setRecorder(newRecorder); // 상태 또는 변수에 레코더를 저장하는 함수를 호출합니다.
    } catch (error) {
      console.error("녹화 시작 중 오류 발생:", error);
    }
  };
  console.log(activeAudioStream);
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
        console.log(activeAudioStream, activeVideoStream);
        // 비디오 스트림의 모든 트랙을 종료합니다.
        if (activeVideoStream) {
          activeVideoStream.getTracks().forEach((track) => track.stop());
          console.log(activeVideoStream.getTracks());
          // activeVideoStream = null;
          setActiveVideoStream(null);
        }

        // 오디오 스트림의 모든 트랙을 종료합니다.
        if (activeAudioStream) {
          activeAudioStream.getTracks().forEach((track) => track.stop());
          // activeAudioStream = null;
          setActiveAudioStream(null);
        }
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
      <button style={buttonStyle("left")} onClick={handleBeforePage}>
        {"<"}
      </button>

      <Routes>
        <Route
          path="/"
          element={
            <div style={{ zIndex: 1 }}>
              <Face page={page} width={window.innerWidth} />
            </div>
          }
        />
      </Routes>

      <img
        src={antSrc}
        alt="Ant Character"
        className="antCharacter"
        style={antCharater}
      />
      <img
        src={grasshopperSrc}
        alt="Grasshopper Character"
        className="grasshopperCharacter"
        style={grasshopperCharater}
      />
      <button onClick={startRecording}>녹화 하기</button>
      <button onClick={stopRecording}>녹화 중지</button>
      <button style={buttonStyle("right")} onClick={handleNextPage}>
        {">"}
      </button>
      {isModalOpen && <StoryEndModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Page;
