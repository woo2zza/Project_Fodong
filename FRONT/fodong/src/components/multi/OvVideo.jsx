import React, { useRef, useEffect } from "react";

export default function OpenViduVideoComponent({ streamManager }) {
  const videoRef = useRef();

  useEffect(() => {
    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
    // console.log("여기 테스트 : ");
    // console.log(streamManager ? true : false);
  }, [streamManager]);

  return <video autoPlay={true} ref={videoRef} style={{ height: "20vh" }} />;
}
