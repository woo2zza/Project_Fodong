import React, { useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

const VideoChat = () => {
  const localStreamElement = useRef(null);
  const [myKey, setMyKey] = useState("");
  const [roomId, setRoomId] = useState("");
  const [otherKeyList, setOtherKeyList] = useState([]);
  const [localStream, setLocalStream] = useState(undefined);
  const [pcListMap, setPcListMap] = useState(new Map());
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    setMyKey(Math.random().toString(36).substring(2, 11));
  }, []);

  const startCam = async () => {
    if (navigator.mediaDevices) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        console.log("Stream found");
        setLocalStream(stream);
        stream.getAudioTracks()[0].enabled = true;
        localStreamElement.current.srcObject = stream;
      } catch (error) {
        console.error("Error accessing media devices:", error);
      }
    }
  };

  const connectSocket = async () => {
    const socket = new SockJS("/signaling");
    const client = Stomp.over(socket);
    client.debug = null;

    client.connect({}, () => {
      console.log("Connected to WebRTC server");
      // ... (다른 stompClient.subscribe 메서드들을 여기에 포함시킵니다.)
    });

    setStompClient(client);
  };

  const createPeerConnection = (otherKey) => {
    const pc = new RTCPeerConnection();
    try {
      pc.addEventListener("icecandidate", (event) =>
        onIceCandidate(event, otherKey)
      );
      pc.addEventListener("track", (event) => onTrack(event, otherKey));
      if (localStream) {
        localStream
          .getTracks()
          .forEach((track) => pc.addTrack(track, localStream));
      }
      console.log("PeerConnection created");
    } catch (error) {
      console.error("PeerConnection failed: ", error);
    }
    return pc;
  };

  // ... (onIceCandidate, onTrack, sendOffer, sendAnswer, setLocalAndSendMessage 함수를 여기에 포함시킵니다.)

  const handleEnterRoom = async () => {
    await startCam();
    if (localStream) {
      // localStreamElement 스타일 설정...
    }
    await connectSocket();
  };

  const handleStartStream = async () => {
    await stompClient.send(`/app/call/key`, {}, {});
    // ... (나머지 로직을 여기에 포함시킵니다.)
  };

  return (
    <div>
      <video
        ref={localStreamElement}
        autoPlay
        style={{ display: "none" }}
      ></video>
      <input
        type="text"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <button onClick={handleEnterRoom}>Enter Room</button>
      <button onClick={handleStartStream}>Start Stream</button>
      <div id="remoteStreamDiv"></div>
    </div>
  );
};

export default VideoChat;
