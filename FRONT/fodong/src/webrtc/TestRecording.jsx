import React, { useState, useRef } from "react";
import { startRecording, stopRecording } from "../recording.js";
import { useReactMediaRecorder } from "react-media-recorder";
const TestRecording = () => {
  // const [recording, setRecording] = useState(false);
  // const mediaRecorderRef = useRef(null);
  // const [chunks, setChunks] = useState([]);

  // const handleStartRecording = async () => {
  //   const mediaRecorder = await startRecording(setChunks, setRecording);
  //   if (mediaRecorder) {
  //     mediaRecorderRef.current = mediaRecorder;
  //     setRecording(true);
  //   }
  // };

  // const handleStopRecording = () => {
  //   stopRecording(mediaRecorderRef.current, chunks);
  //   setRecording(false);
  //   setChunks([]);
  // };

  // return (
  //   <div>
  //     <button onClick={handleStartRecording} disabled={recording}>
  //       녹화 긔
  //     </button>
  //     <button onClick={handleStopRecording} disabled={!recording}>
  //       녹화 끝
  //     </button>
  //   </div>
  // );
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ video: true });

  return (
    <div>
      <p>{status}</p>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      <video src={mediaBlobUrl} controls autoPlay loop />
    </div>
  );
};

export default TestRecording;
