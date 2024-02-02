import React, { Component } from "react";
import * as faceapi from "face-api.js";
import Webcam from "react-webcam";

class FaceRecognitionComponent extends Component {
  constructor(props) {
    super(props);
    this.webcamRef = React.createRef();
    this.state = {
      loadingModels: true,
      error: null,
    };
    this.faceCanvasRef = React.createRef(); // 얼굴을 표시할 캔버스의 참조를 추가
  }

  async componentDidMount() {
    try {
      await this.loadFaceAPIModels();
      this.setState({ loadingModels: false });
    } catch (error) {
      console.error("모델 로딩 중 오류 발생:", error);
      this.setState({ error: "모델을 로드하는 데 실패했습니다." });
    }

    this.initWebcamStream();
  }

  componentWillUnmount() {
    if (this.webcamRef.current && this.webcamRef.current.srcObject) {
      this.webcamRef.current.srcObject
        .getTracks()
        .forEach((track) => track.stop());
    }
  }

  async loadFaceAPIModels() {
    const MODEL_URL = process.env.PUBLIC_URL+"/models";
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
    await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
  }

  initWebcamStream = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          const videoElement = this.webcamRef.current;
          if (videoElement) {
            videoElement.srcObject = stream;
            videoElement.onloadedmetadata = () => {
              videoElement.play().catch((error) => {
                console.error("비디오 재생 중 오류 발생:", error);
              });
              this.processFrame();
            };
          }
        })
        .catch((error) => {
          console.error("웹캠 스트림을 가져오는 중 오류 발생:", error);
          this.setState({ error: "웹캠에 접근할 수 없습니다." });
        });
    }
  };

  processFrame = async () => {
    const videoElement = this.webcamRef.current;

    if (videoElement) {
      if (!this.canvas) {
        this.canvas = faceapi.createCanvasFromMedia(videoElement);
        document.body.appendChild(this.canvas);
      }

      const displaySize = {
        width: videoElement.width,
        height: videoElement.height,
      };
      faceapi.matchDimensions(this.canvas, displaySize);

      const detections = await faceapi
        .detectAllFaces(videoElement, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptors();
      const resizedDetections = faceapi.resizeResults(detections, displaySize);

      const context = this.canvas.getContext("2d");
      context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      resizedDetections.forEach(async (detection) => {
        const { x, y, width, height } = detection.detection.box;
        // 웹캠에서 얼굴 부분 추출
        const face = await videoElement
          .captureStream()
          .getVideoTracks()[0]
          .createImageBitmap(x, y, width, height);

        // 얼굴을 그리기 위한 별도의 캔버스 생성
        const faceCanvas = document.createElement("canvas");
        faceCanvas.width = width;
        faceCanvas.height = height;
        const faceCtx = faceCanvas.getContext("2d");

        // 얼굴 부분을 캔버스에 그리기
        faceCtx.beginPath();
        faceCtx.arc(width / 2, height / 2, width / 2, 0, 2 * Math.PI);
        faceCtx.clip();
        faceCtx.drawImage(face, 0, 0, width, height);

        // 원하는 위치에 얼굴 캔버스 표시 (예: document.body에 추가)
        document.body.appendChild(faceCanvas);
      });

      requestAnimationFrame(this.processFrame);
    }
  };

  render() {
    const { loadingModels, error } = this.state;

    return (
      <div>
        {loadingModels && <p>모델 로딩 중...</p>}
        {error && <p>에러: {error}</p>}
        <Webcam
          ref={this.webcamRef}
          autoPlay
          playsInline
          muted
          style={{ display: loadingModels ? "none" : "block" }}
        />
        {/* Canvas는 직접 제어하므로 React 컴포넌트로 추가하지 않습니다. */}
      </div>
    );
  }
}

export default FaceRecognitionComponent;
