import React, { useRef, useState, useEffect } from "react";
import * as faceapi from "face-api.js";
import * as hull from "hull.js";
import grass from "./img/베짱이1.png";

function App() {
  // React 컴포넌트 정의
  const [modelsLoaded, setModelsLoaded] = useState(false); // 모델 로드 상태를 관리하는 상태 변수
  const videoRef = useRef(); // 웹캠 비디오 요소를 참조하는 useRef
  const canvasRef = useRef(); // 캔버스 요소를 참조하는 useRef

  // 모델을 로드하는 함수
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + "/models";
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68TinyNet.loadFromUri(MODEL_URL);
      setModelsLoaded(true); // 모델 로딩이 완료되면 모델 로드 상태를 true로 설정
    };
    loadModels(); // loadModels 함수 호출
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행

  // 웹캠을 설정하는 함수
  useEffect(() => {
    if (modelsLoaded) {
      // 모델이 로딩되었을 때만 실행
      const video = videoRef.current; // 웹캠 비디오 요소 참조
      navigator.getUserMedia(
        { video: {} },
        (stream) => {
          video.srcObject = stream; // 웹캠 스트림을 비디오 요소에 할당하여 웹캠 화면 표시
        },
        (err) => console.error(err)
      );
      video.play().then(() => {
        detectFace(); // 웹캠 비디오 재생 시작 후 얼굴 감지 함수 호출
      });
    }
  }, [modelsLoaded]); // modelsLoaded 상태가 변경될 때마다 실행

  // 얼굴을 감지하고 윤곽선을 그리는 함수
  const detectFace = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const displaySize = { width: video.width, height: video.height };

    faceapi.matchDimensions(canvas, displaySize); // 캔버스 크기를 비디오 크기와 일치시킴

    setInterval(async () => {
      // 일정 시간 간격으로 얼굴 감지 실행
      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()) // 얼굴 탐지 실행
        .withFaceLandmarks(true); // 얼굴 랜드마크도 함께 감지

      const resizedDetections = faceapi.resizeResults(detections, displaySize); // 감지 결과 크기 조정
      const ctx = canvas.getContext("2d"); // 캔버스 2D 그래픽 컨텍스트 얻기
      canvas.width = video.width;
      canvas.height = video.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      resizedDetections.forEach((detection) => {
        // 각 얼굴에 대해 반복
        if (detection && detection.detection) {
          ctx.save();
          cropContour(ctx, [
            ...detection.landmarks.getJawOutline(),
            ...detection.landmarks.getLeftEyeBrow(),
            ...detection.landmarks.getRightEyeBrow(),
          ]); // 얼굴 윤곽을 찾아내고 클리핑
          ctx.clip();
          ctx.drawImage(video, 0, 0, video.width, video.height);
          ctx.restore();
        }
      });
    }, 100); // 100ms마다 감지를 수행합니다.
  };

  // hull.js를 사용하여 얼굴 주변의 윤곽선을 찾아내고 캔버스에 그리는 함수
  const cropContour = (ctx, points, isClosed = false) => {
    const hullPoints = hull(points, 300, [".x", ".y"]);
    ctx.beginPath();
    hullPoints.slice(1).forEach(({ x, y }) => {
      // 윤곽선을 찾아내는 hull 함수 호출
      ctx.lineTo(x, y); // 윤곽선을 그리기 위해 점들을 연결
    });

    if (isClosed) {
      // 윤곽선이 닫혀 있는 경우
      const from = hullPoints[hullPoints.length - 1];
      const to = hullPoints[0];
      if (from && to) {
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y); // 처음과 끝을 연결하여 윤곽선을 닫음
      }
    }

    ctx.closePath();
    ctx.stroke();
    ctx.clip();
  };

  return (
    <div
      style={{
        background: `url(${grass})`,
        height: "100vh",
        width: "100vw",
        backgroundSize: "cover",
      }}
    >
      <video
        ref={videoRef}
        width="1366"
        height="1024"
        autoPlay
        muted
        style={{ display: "none" }}
      ></video>
      <canvas ref={canvasRef} width="1366" height="1024" />
    </div>
  );
}

export default App;
