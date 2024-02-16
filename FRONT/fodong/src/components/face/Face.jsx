import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { useParams } from "react-router-dom"; // useParams 추가
import "../storyTelling/StoryTelling.css";
import { Button } from "@mui/material";

function Face({ page, width, videoRef }) {
  const [videoStream, setVideoStream] = useState(null); // 비디오 스트림 상태를 관리하는 state를 선언
  // const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [faceImages, setFaceImages] = useState([]); // 각 얼굴의 이미지 데이터 URL을 저장

  const getPositionStyle = (index, page, width) => {
    let bottom, left;

    // eslint-disable-next-line default-case
    switch (page) {
      case 1:
        if (index === 1) {
          // antCharacter 스타일
          bottom = width > 2499 ? "20%" : "28%";
          left = width > 2499 ? "11%" : "16%";
        } else if (index === 2) {
          // grasshopperCharacter 스타일
          bottom = width > 2499 ? "26%" : "37%";
          left = width > 2499 ? "52%" : "64%";
        }
        break;
      case 2:
        if (index === 1) {
          bottom =  width > 2499 ? "15%" : "25%";
          left = width > 2499 ? "16%" : "19%";
        } else if (index === 2) {
          bottom = width > 2499 ? "19%" : "29%";
          left = width > 2499 ? "64%" : "73%";
        }
        break;
      case 3:
        if (index === 1) {
          bottom =  width > 2499 ? "22%" : "32%";
          left = width > 2499 ? "60%" : "68.5%";
        } else if (index === 2) {
          bottom = width > 2499 ? "25%" : "34%";
          left = width > 2499 ? "21%" : "21%";
        }
        break;
      // 다른 페이지 번호에 대한 조건을 추가할 수 있습니다.
      default:
        bottom = "100px"; // 기본값
        left = "50%"; // 기본값
    }
    return { bottom, left };
  };

  useEffect(() => {
    // face-api 모델을 비동기적으로 로드하는 함수
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("../models");
      console.log("해줘");
      await faceapi.nets.faceLandmark68Net.loadFromUri("../models");
      // await faceapi.nets.faceRecognitionNet.loadFromUri("../models");
      // await faceapi.nets.faceExpressionNet.loadFromUri("../models");
      startVideo(); // 모델 로딩 후 비디오 스트림을 시작
    };
    // 모델 로딩 함수를 실행
    loadModels();
  }, []);

  const startVideo = async () => {
    // 비디오 스트림을 시작하는 함수
    try {
      // 브라우저의 웹캠을 통해 비디오 스트림을 가져온다.
      const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
      videoRef.current.srcObject = stream; // 비디오 스트림을 videoRef에 연결
      setVideoStream(stream); // 비디오 스트림 상태를 업데이트
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    let intervalId;

    if (videoStream) {
      // console.log("1");
      // videoStream이 설정되었는지 확인
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const displaySize = { width: video.width, height: video.height }; // 비디오의 크기를 가져온다.
      faceapi.matchDimensions(canvas, displaySize); // 캔버스의 크기를 비디오의 크기에 맞춘다.

      // 일정 시간마다 얼굴 감지를 반복
      intervalId = setInterval(async () => {
        let detections = await faceapi // face-api.js를 사용하여 비디오에서 얼굴을 감지
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          // .withFaceExpressions();

        // 감지된 얼굴을 x좌표 기준으로 정렬합니다.
        detections = detections.sort(
          (a, b) => a.detection.box.x - b.detection.box.x
        );

        // 감지된 얼굴이 있으면, 각 얼굴에 대해 이미지 추출 함수를 호출
        if (detections && detections.length > 0) {
          // 처음 2개의 감지된 얼굴만 처리
          detections.slice(0, 2).forEach((detectedFace, index) => {
            extractFaceFromBox(video, detectedFace.detection.box, index);
          });
        } else {
          // 얼굴이 감지되지 않았다면 콘솔에 메시지를 출력
          console.log("인식된 얼굴이 없습니다.");
        }

        // 캔버스를 초기화
        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
      }, 100);
    } else {
      if (intervalId) clearInterval(intervalId);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    }
  }, [videoStream]);

  async function extractFaceFromBox(inputImage, box, index) {
    // 얼굴 이미지를 추출하고 상태에 저장하는 함수
    // console.log("2");
    const regionsToExtract = [
      new faceapi.Rect(box.x, box.y, box.width, box.height),
    ];
    // face-api.js를 사용하여 입력 이미지에서 지정된 영역의 얼굴 이미지를 추출
    const extractedImages = await faceapi.extractFaces(
      inputImage,
      regionsToExtract
    );

    if (extractedImages.length > 0) {
      // 첫 번째 이미지를 가져와 데이터 URL을 생성
      const cnv = extractedImages[0];
      const dataUrl = cnv.toDataURL();
      // faceImages 상태를 업데이트
      setFaceImages((prevImages) => {
        const newImages = [...prevImages];
        newImages[index] = dataUrl; // 인덱스 위치에 이미지 데이터 URL을 저장합니다.
        return newImages;
      });
    }
  }

  const stopVideo = () => {
    const stream = videoRef.current.srcObject;
    if (stream && stream.getTracks) {
      stream.getTracks().forEach((track) => {
        track.stop();
      });
      videoRef.current.srcObject = null;
      setVideoStream(null);
    }
  };

  return (
    <div>
      <video
        ref={videoRef}
        width="1"
        height="1"
        autoPlay
        style={{ position: "absolute", top: "1px" }}
      />
      <canvas ref={canvasRef} style={{ position: "absolute" }} />
      <div>
        {videoStream &&
          faceImages.map((src, index) => {
            const style = getPositionStyle(index + 1, page, window.innerWidth); // 페이지와 인덱스에 따른 스타일 계산
            return (
              <div
                key={index}
                className="faceImage"
                style={{
                  position: "absolute",
                  minWidth: "100px",
                  minHeight: "100px",
                  backgroundSize: "cover",
                  backgroundPosition: "50% 50%",
                  borderRadius: "50%",
                  backgroundImage: `url(${src})`,
                  bottom: style.bottom,
                  left: style.left,
                }}
              ></div>
            );
          })}
      </div>
      {/* <img src={ant} alt="개미" style={{ zIndex: 4 }}></img> */}
      {/* <button
        onClick={stopVideo}
        style={{
          width: "100px",
          height: "30px",
          fontSize: "20px",
          position: "absolute",
          top: "20px",
          left: "20px",
        }}
      >
        카메라 종료
      </button> */}
      {/* <Button
        variant="contained"
        onClick={stopVideo}
        style={{ position: "absolute", top: "10px", left: "10px" }}
      >
        카메라 종료
      </Button> */}
    </div>
  );
}

export default Face;
