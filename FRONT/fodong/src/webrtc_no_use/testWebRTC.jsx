// const WebRTC = () => {
//   const check = () => {
//     console.log("시작");
//   };
//   return (
//     <>
//       <div>
//         <input type="number" id="roomIdInput" />
//         {/* 룸 아이디를 입력후 클릭하는 button */}
//         <button onClick={check} type="button" id="enterRoomBtn">
//           enter Room
//         </button>
//         {/* enterRoomBtn 클릭시 나타남, Streams 정보를 담은 Peer 를 웹소켓 ( 시그널링 ) */}
//         <button type="button" id="startSteamBtn" style={{ display: "none" }}>
//           start Streams
//         </button>
//       </div>
//       <video
//         id="localStream"
//         autoPlay
//         playsInline
//         controls
//         style={{ display: "none" }}
//       ></video>
//       {/* WebRTC에 연결된 웹캠들이 추가되는 Div */}
//       <div id="remoteStreamDiv"></div>
//       <script src="./peerConfig.js"></script>
//     </>
//   );
// };

// export default WebRTC;

// import React, { useState, useEffect, useRef } from "react";
// import { Client } from "@stomp/stompjs";

// const WebRTC = () => {
//   const [roomId, setRoomId] = useState("");
//   const [localStream, setLocalStream] = useState(null);
//   const localStreamElement = useRef(null);
//   const stompClient = useRef(null);
//   const pcListMap = useRef(new Map());
//   const otherKeyList = useRef([]);
//   const myKey = useRef(Math.random().toString(36).substring(2, 11)).current;

//   useEffect(() => {
//     stompClient.current = new Client({
//       brokerURL: "ws://192.168.100.91:8080/",
//       onConnect: () => {
//         console.log("Connected to WebRTC server");
//         subscribeToTopics();
//       },
//       onStompError: (frame) => {
//         console.error("Broker reported error: " + frame.headers["message"]);
//         console.error("Additional details: " + frame.body);
//       },
//     });

//     stompClient.current.activate();

//     return () => {
//       if (stompClient.current.active) {
//         stompClient.current.deactivate();
//       }
//     };
//   }, []);

//   const startCam = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         audio: true,
//         video: true,
//       });
//       setLocalStream(stream);
//       localStreamElement.current.srcObject = stream;
//     } catch (error) {
//       console.error("Error accessing media devices:", error);
//     }
//   };

//   const subscribeToTopics = () => {
//     const { subscribe } = stompClient.current;
//     subscribe(`/topic/peer/iceCandidate/${myKey}/${roomId}`, (candidate) => {
//       const key = JSON.parse(candidate.body).key;
//       const message = JSON.parse(candidate.body).body;
//       if (pcListMap.current.get(key)) {
//         pcListMap.current
//           .get(key)
//           .addIceCandidate(new RTCIceCandidate(message));
//       }
//     });

//     subscribe(`/topic/peer/offer/${myKey}/${roomId}`, (offer) => {
//       const key = JSON.parse(offer.body).key;
//       const message = JSON.parse(offer.body).body;
//       const pc = createPeerConnection(key);
//       pcListMap.current.set(key, pc);
//       pc.setRemoteDescription(new RTCSessionDescription(message));
//       sendAnswer(pc, key);
//     });

//     subscribe(`/topic/peer/answer/${myKey}/${roomId}`, (answer) => {
//       const key = JSON.parse(answer.body).key;
//       const message = JSON.parse(answer.body).body;
//       if (pcListMap.current.get(key)) {
//         pcListMap.current
//           .get(key)
//           .setRemoteDescription(new RTCSessionDescription(message));
//       }
//     });

//     subscribe(`/topic/call/key`, () => {
//       stompClient.current.publish({
//         destination: `/app/send/key`,
//         body: JSON.stringify(myKey),
//       });
//     });

//     subscribe(`/topic/send/key`, (message) => {
//       const key = JSON.parse(message.body);
//       if (myKey !== key && !otherKeyList.current.includes(key)) {
//         otherKeyList.current.push(key);
//       }
//     });
//   };

//   const createPeerConnection = (otherKey) => {
//     const pc = new RTCPeerConnection();
//     pc.onicecandidate = (event) => {
//       if (event.candidate) {
//         stompClient.current.publish({
//           destination: `/app/peer/iceCandidate/${otherKey}/${roomId}`,
//           body: JSON.stringify({
//             key: myKey,
//             body: event.candidate,
//           }),
//         });
//       }
//     };
//     pc.ontrack = (event) => {
//       const remoteStreamDiv = document.getElementById("remoteStreamDiv");
//       if (!document.getElementById(otherKey) && remoteStreamDiv) {
//         const video = document.createElement("video");
//         video.autoplay = true;
//         video.controls = true;
//         video.id = otherKey;
//         video.srcObject = event.streams[0];
//         remoteStreamDiv.appendChild(video);
//       }
//     };
//     localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));
//     return pc;
//   };

//   const sendOffer = (pc, otherKey) => {
//     pc.createOffer().then((offer) => {
//       pc.setLocalDescription(offer);
//       stompClient.current.publish({
//         destination: `/app/peer/offer/${otherKey}/${roomId}`,
//         body: JSON.stringify({
//           key: myKey,
//           body: offer,
//         }),
//       });
//     });
//   };

//   const sendAnswer = (pc, otherKey) => {
//     pc.createAnswer().then((answer) => {
//       pc.setLocalDescription(answer);
//       stompClient.current.publish({
//         destination: `/app/peer/answer/${otherKey}/${roomId}`,
//         body: JSON.stringify({
//           key: myKey,
//           body: answer,
//         }),
//       });
//     });
//   };

//   const enterRoom = async () => {
//     await startCam();
//     setRoomId(roomId);
//   };

//   const startStreams = () => {
//     otherKeyList.current.forEach((key) => {
//       if (!pcListMap.current.has(key)) {
//         const pc = createPeerConnection(key);
//         pcListMap.current.set(key, pc);
//         sendOffer(pc, key);
//       }
//     });
//   };

//   return (
//     <div>
//       <input
//         type="number"
//         value={roomId}
//         onChange={(e) => setRoomId(e.target.value)}
//       />
//       <button onClick={enterRoom}>Enter Room</button>
//       <button onClick={startStreams}>Start Streams</button>
//       <video
//         ref={localStreamElement}
//         autoPlay
//         playsInline
//         controls
//         style={{ display: localStream ? "block" : "none" }}
//       ></video>
//       <div id="remoteStreamDiv"></div>
//     </div>
//   );
// };

// export default WebRTC;
