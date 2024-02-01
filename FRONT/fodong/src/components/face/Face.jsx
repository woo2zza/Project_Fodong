import React from "react";
import * as faceapi from "face-api.js";
import jjwImage from "./img/ljh.jpg";
import grass from "./img/베짱이1.png";

function App() {
  const [modelsLoaded, setModelsLoaded] = React.useState(false);  // 모델 로딩 상태를 관리하는 state를 정의합니다. 초기값은 false입니다.
  const [facePosition, setFacePosition] = React.useState({ x: 250, y: 550 }); // 얼굴을 그릴 위치
  const [faceSize, setFaceSize] = React.useState({ width: 200, height: 200 }); // 얼굴을 그릴 크기
  const canvasRef = React.useRef(); // canvas에 대한 참조를 생성합니다.
  const imageRef = React.useRef(); // 이미지에 대한 참조를 생성합니다.

  React.useEffect(() => { // 컴포넌트가 마운트되거나, 지정된 의존성이 변경될 때 실행될 효과를 정의합니다.
    const loadModelsAndDetectFaces = async () => { // 모델을 로드하고 얼굴을 감지하는 비동기 함수를 정의합니다.
      const MODEL_URL = process.env.PUBLIC_URL + "/models"; // 모델 URL을 정의합니다.

      await Promise.all([ // 모든 모델이 로드될 때까지 기다립니다.
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]);
      setModelsLoaded(true); // 모델 로딩 상태를 true로 업데이트합니다.

      const imgEl = imageRef.current; // 이미지 참조에서 현재 값을 가져옵니다
      const canvas = canvasRef.current; // canvas 참조에서 현재 값을 가져옵니다.
      if (canvas && imgEl) { // canvas와 imgEl이 모두 존재하는지 확인
        const ctx = canvas.getContext("2d"); // 2D rendering context를 가져옵니다.
        if (ctx) { // ctx가 정의되어 있는지 확인
          const detections = await faceapi
            .detectAllFaces(imgEl, new faceapi.TinyFaceDetectorOptions()) // 이미지에서 모든 얼굴을 감지합니다.
            .withFaceLandmarks(); // 얼굴 랜드마크와 함께 감지합니다.
          const resizedDetections = faceapi.resizeResults(detections, {  // 감지된 결과를 이미지 크기에 맞게 조정합니다.
            width: imgEl.width,
            height: imgEl.height,
          });
          canvas.width = imgEl.width; // canvas의 너비를 이미지의 너비로 설정합니다.
          canvas.height = imgEl.height; // canvas의 높이를 이미지의 높이로 설정합니다.

          ctx.clearRect(0, 0, canvas.width, canvas.height); // canvas를 클리어합니다.

          resizedDetections.forEach((detection) => { // 감지된 얼굴마다 반복합니다.
            const { x, y, width, height } = detection.detection.box; // 감지된 얼굴의 bounding box 정보를 가져옵니다.
            const centerX = facePosition.x;  // 얼굴을 그릴 중심 x 좌표입니다.
            const centerY = facePosition.y; // 얼굴을 그릴 중심 y 좌표입니다.
            const radius = Math.max(faceSize.width, faceSize.height) / 2 ; // 얼굴을 그릴 반지름을 계산합니다

            ctx.beginPath(); // 새로운 경로를 시작합니다.
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false); // 얼굴을 그릴 원을 그립니다.
            ctx.clip(); // 경로를 클리핑합니다.

            ctx.drawImage( // 이미지를 canvas에 그립니다.
              imgEl,
              x,
              y,
              width,
              height,
              facePosition.x - radius,
              facePosition.y - radius,
              faceSize.width,
              faceSize.height
            );

            ctx.restore(); // 이전 상태로 복원합니다.
          });
        }
      }
    };
    loadModelsAndDetectFaces();
  }, [facePosition, faceSize]); // 위치와 크기가 변경되면 다시 감지하고 그립니다.
  return (
    <div
      style={{
        background: `url(${grass})`,
        height: "100vh",
        width: "100vw",
        backgroundSize: "cover",
      }}
    >
      {modelsLoaded ? ( // 모델이 로드되었는지에 따라 조건부 렌더링을 수행합니다.
        <div style={{ position: "relative" }}>
          <img
            ref={imageRef}
            src={jjwImage}
            alt="Source"
            style={{ display: "none" }}
          />
          <canvas
            ref={canvasRef}
            style={{ position: "absolute", left: 100, top: 0 }}
          />
          {/* 여기에 위치와 크기를 조절할 수 있는 인터페이스를 추가할 수 있습니다. */}
        </div>
      ) : (
        <div>Loading models...</div>
      )}
    </div>
  );
}

export default App;