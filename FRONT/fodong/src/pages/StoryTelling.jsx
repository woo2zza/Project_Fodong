// import React, { useState } from "react";
import React, { useState, useRef } from "react";
// import { startRecording, stopRecording } from "../recording.js";
import html2canvas from "html2canvas";
import Script from "../components/storyTelling/Script";
import Page1 from "../components/storyTelling/Page1";
import { Route, Routes } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Face from "../components/face/Face";

const StoryTelling = () => {
  const [scriptPage, setScriptPage] = useState(0);

  //
  const videoRef = useRef(null); // 비디오 요소 참조를 위한 ref
  const mediaRecorderRef = useRef(null); // MediaRecorder 인스턴스를 저장
  const [recording, setRecording] = useState(false); // 녹화 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false); //

  const handlePageChange = () => {
    setScriptPage(0);
  };

  const startRecording = async () => {
    const canvasElement = await html2canvas(
      document.querySelector("#container")
    );
    const stream = canvasElement.captureStream(); // canvas에서 스트림 캡처
    const mediaRecorder = new MediaRecorder(stream, { mimeType: "video/webm" });

    let chunks = [];
    mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      videoRef.current.src = URL.createObjectURL(blob);
    };

    mediaRecorder.start();
    mediaRecorderRef.current = mediaRecorder;
    setRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const stopVideo = () => {
    const stream = videoRef.current?.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
    }
    setIsModalOpen(false);
  }

  

  return (
    <>
      <section  >
        <Grid id="container" container spacing={2}>
          <Grid item xs={12}>
            <Routes>
              <Route
                path="/:page"
                element={<Page1 onPageChange={handlePageChange}  videoRef={videoRef} stopVideo={stopVideo}  />}
              />
              {/* <Route path="/:page" element={Charatecr} */}
            </Routes>
           
          </Grid>
        </Grid>
      </section>
      <section >
        <Routes>
          <Route
            path="/:page"
            element={
              <Script scriptPage={scriptPage} setScriptPage={setScriptPage}  stopVideo={stopVideo}  />
            }
          />
        </Routes>
      </section>
      {/* <button onClick={startRecording} disabled={recording}>
        Start Recording
      </button>
      <button onClick={stopRecording} disabled={!recording}>
        Stop Recording
      </button> */}
      {/* <video ref={videoRef} controls style={{ width: "100%" }}></video> */}
    </>
  );
};

const mainStyle = {
  padding: "100px",
  backgroundColor: "#f0e68c",
  height: "100vh",
};

const script = {
  border: "1px solid ",
  margin: "2%",
  maxWidth: "100%",
  borderRadius: "18px",
};

export default StoryTelling;
