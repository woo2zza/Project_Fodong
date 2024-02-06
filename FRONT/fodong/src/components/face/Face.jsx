import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import ant from './img/ant2.png'

function Face() {
  console.log(123123123)
  const [videoStream, setVideoStream] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const outputImageRef = useRef([]); // 출력 이미지 요소에 대한 ref
  const outputImageRef2 = useRef(null); // 출력 이미지 요소에 대한 ref
  const imgFilterRef = useRef(null); // 이미지 필터 요소에 대한
  
  useEffect(() => { // Face API 모델을 로드
    const loadModels = async () => {
      console.log(33333333)
      await faceapi.nets.tinyFaceDetector.loadFromUri('../models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('../models');
      await faceapi.nets.faceRecognitionNet.loadFromUri('../models');
      await faceapi.nets.faceExpressionNet.loadFromUri('../models');
      await startVideo(); // 모델 로딩 후 비디오 시작
    };

    loadModels();
  }, []);

  const startVideo = async () => { 
    // 웹캠 비디오 스트림을 가져와 비디오 요소에 할당하는 함수
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
      videoRef.current.srcObject = stream;
      setVideoStream(stream);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (videoStream) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const displaySize = { width: video.width, height: video.height };

      faceapi.matchDimensions(canvas, displaySize);

      setInterval(async () => {
        // 얼굴을 감지하고 얼굴 랜드마크 및 표정을 분석하는 함수
        const detection = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()) // 얼굴 감지
          .withFaceLandmarks()// 얼굴 랜드마크 감지
          .withFaceExpressions(); // 얼굴 표정 감지

        let happiness = 0; // 행복 표정 초기화

        if (detection && detection.length > 0) { // 얼굴이 감지된 경우
          detection.forEach((detectedFace, index) => {
            extractFaceFromBox(video, detectedFace.detection.box, index);}); // 얼굴 이미지 추출
          // happiness = detection.expressions.happy; // 행복 표정 분석
        } else {
          console.log('인식된 얼굴이 없습니다.');
        }

        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

        if (happiness > 0.1) {
          console.log('웃다');
          // 이 부분에서 이미지 위치 및 스타일을 업데이트할 수 있습니다.
        } else {
          // 이 부분에서 이미지 위치 및 스타일을 업데이트할 수 있습니다.
        }
      }, 100);
    }
  }, [videoStream]);

  async function extractFaceFromBox(inputImage, box, index) {
    // 얼굴 이미지 추출 함수
    const regionsToExtract = [
      new faceapi.Rect(box.x, box.y, box.width, box.height), // 얼굴 영역 지정
    ];

    const faceImages = await faceapi.extractFaces(inputImage, regionsToExtract); // 얼굴 이미지 추출

    if (faceImages.length > 0) {
     
      const cnv = faceImages[0];
      // console.log('카메라 나와라잇')
      if (!outputImageRef.current[index]) {
        outputImageRef.current[index] = React.createRef();
      }
      const ref = outputImageRef.current[index];
      console.log('1111', index)
      // console.log('23')
      if (ref && ref.current) {
        ref.current.style.backgroundImage = `url(${cnv.toDataURL()})`;
        ref.current.style.backgroundBlendMode = 'difference';
    }
  }}

  return (
    <div>
      <video
        ref={videoRef}
        width="1"
        height="1"
        autoPlay
        muted
        src=""
        style={{ position: 'absolute', top: '1px' }}
      />
      <canvas ref={canvasRef} style={{ position: 'absolute' }} />
      <div className="fullmoon">
        <div
          className="imgFilter"
          ref={imgFilterRef}
          style={{
            position: 'absolute',
            width: '200px',
            height: '200px',
            bottom: '0px', // 이미지 필터 요소 위치
          }}
        ></div>
        {outputImageRef.current.map((ref, index) => (
          <div
            key={index}
            ref={ref}
            style={{
              position: 'absolute',
              width: '200px',
              height: '200px',
              backgroundSize: 'cover',
              backgroundPosition: '50% 50%',
              borderRadius: '50%',
              bottom: `${0 + index * 150}px`, // 출력 이미지 요소 위치 조정
              left: `${0 + index * 150}px`, // 출력 이미지 요소 위치 조정
              // ... 기타 스타일 ...
            }}
          ></div>))}
        {/* <div
          id="outputImage2"
          ref={outputImageRef2}
          style={{
            position: 'absolute',
            width: '200px',
            height: '200px',
            backgroundSize: 'cover',
            backgroundPosition: '50% 50%',
            borderRadius: '50%',
            bottom: '350px', // 출력 이미지 요소 위치
            left: '440px', // 출력 이미지 요소 위치
          }}
        ></div> */}
      </div>
      <img src={ant} alt='개미' style={{zIndex :4}}></img>
    </div>
  );
}

export default Face;