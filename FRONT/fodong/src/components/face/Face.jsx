// import React, { useEffect, useRef, useState } from "react";
// import * as faceapi from "face-api.js";
// import ant from "./img/ant2.png";

// function Face() {
//   console.log(123123123);
//   const [videoStream, setVideoStream] = useState(null);
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const outputImageRef = useRef(null); // 출력 이미지 요소에 대한 ref
//   const imgFilterRef = useRef(null); // 이미지 필터 요소에 대한

//   useEffect(() => {
//     // Face API 모델을 로드
//     const loadModels = async () => {
//       console.log(33333333);
//       await faceapi.nets.tinyFaceDetector.loadFromUri("../models");
//       console.log('해줘')
//       await faceapi.nets.faceLandmark68Net.loadFromUri("../models");
//       await faceapi.nets.faceRecognitionNet.loadFromUri("../models");
//       await faceapi.nets.faceExpressionNet.loadFromUri("../models");
//       startVideo(); // 모델 로딩 후 비디오 시작
//     };

//     loadModels();
//   }, []);

//   const startVideo = () => {
//     // 웹캠 비디오 스트림을 가져와 비디오 요소에 할당하는 함수
//     console.log("카메라 시작");
//     navigator.getUserMedia(
//       { video: {} }, // 빈 객체를 사용하여 기본 비디오 설정을 요청
//       (stream) => {
//         videoRef.current.srcObject = stream;
//         setVideoStream(stream);
//       },
//       (err) => console.error(err)
//     );
//   };

//   useEffect(() => {
//     if (videoStream) {
//       const video = videoRef.current;
//       const canvas = canvasRef.current;
//       const displaySize = { width: video.width, height: video.height };

//       faceapi.matchDimensions(canvas, displaySize);

//       setInterval(async () => {
//         // 얼굴을 감지하고 얼굴 랜드마크 및 표정을 분석하는 함수
//         const detection = await faceapi
//           .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions()) // 얼굴 감지
//           .withFaceLandmarks() // 얼굴 랜드마크 감지
//           .withFaceExpressions(); // 얼굴 표정 감지

//         let happiness = 0; // 행복 표정 초기화

//         if (detection !== undefined) {
//           // 얼굴이 감지된 경우
//           extractFaceFromBox(video, detection.detection.box); // 얼굴 이미지 추출
//           happiness = detection.expressions.happy; // 행복 표정 분석
//         } else {
//           console.log("인식된 얼굴이 없습니다.");
//         }

//         canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

//         if (happiness > 0.1) {
//           console.log("웃다");
//           // 이 부분에서 이미지 위치 및 스타일을 업데이트할 수 있습니다.
//         } else {
//           // 이 부분에서 이미지 위치 및 스타일을 업데이트할 수 있습니다.
//         }
//       }, 100);
//     }
//   }, [videoStream]);

//   async function extractFaceFromBox(inputImage, box) {
//     // 얼굴 이미지 추출 함수
//     const regionsToExtract = [
//       new faceapi.Rect(box.x, box.y, box.width, box.height), // 얼굴 영역 지정
//     ];

//     const faceImages = await faceapi.extractFaces(inputImage, regionsToExtract); // 얼굴 이미지 추출

//     if (faceImages.length === 0) {
//       console.log("Face not found"); // 얼굴이 감지 되지 않은 경우
//     } else {
//       const cnv = faceImages[0];
//       console.log("카메라 나와라잇");
//       outputImageRef.current.style.backgroundImage = `url(${cnv.toDataURL()})`; // 이미지 출력
//       outputImageRef.current.style.backgroundBlendMode = "difference"; // 이미지 블렌딩 모드 설정
//     }
//   }

//   return (
//     <div>
//       <video
//         ref={videoRef}
//         width="1"
//         height="1"
//         autoPlay
//         muted
//         src=""
//         style={{ position: "absolute", top: "1px" }}
//       />
//       <canvas ref={canvasRef} style={{ position: "absolute" }} />
//       <div>
//         {videoStream && faceImages.map((src, index) => (
//           <div
//             key={index}
//             style={{
//               position: "absolute",
//               width: "200px",
//               height: "200px",
//               backgroundSize: "cover",
//               backgroundPosition: "50% 50%",
//               borderRadius: "50%",
//               backgroundImage: `url(${src})`,
//               bottom: `${370}px`,
//               left: `${150 + index * 200}px`,
//             }}
//           ></div>
//         ))}
//       <div className="fullmoon">
//         <div
//           className="imgFilter"
//           ref={imgFilterRef}
//           style={{
//             position: "absolute",
//             width: "200px",
//             height: "200px",
//             bottom: "0px", // 이미지 필터 요소 위치
//           }}
//         ></div>
//         <div
//           id="outputImage"
//           ref={outputImageRef}
//           style={{
//             position: "absolute",
//             width: "200px",
//             height: "200px",
//             backgroundSize: "cover",
//             backgroundPosition: "50% 50%",
//             borderRadius: "50%",
//             bottom: "350px", // 출력 이미지 요소 위치
//             left: "140px", // 출력 이미지 요소 위치
//           }}
//         ></div>
//       </div>
//       {/* <img src={ant} alt="개미" style={{ zIndex: 4 }}></img> */}
//       <button onClick={stopVideo} style={{ width: '100px', height: '30px', fontSize: '20px'}}>카메라 종료</button>
//       <img src={ant} alt="개미" style={{ zIndex: 4 }}></img>
//     </div>
//   );
// }

// export default Face;
