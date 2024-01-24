const WebRTC = () => {
  return (
    <>
      <div>
        <input type="number" id="roomIdInput" />
        {/* 룸 아이디를 입력후 클릭하는 button */}
        <button type="button" id="enterRoomBtn">
          enter Room
        </button>
        {/* enterRoomBtn 클릭시 나타남, Streams 정보를 담은 Peer 를 웹소켓 ( 시그널링 ) */}
        <button type="button" id="startSteamBtn" style={{ display: "none" }}>
          start Streams
        </button>
      </div>
      <video
        id="localStream"
        autoPlay
        playsInline
        controls
        style={{ display: "none" }}
      ></video>
      {/* WebRTC에 연결된 웹캠들이 추가되는 Div */}
      <div id="remoteStreamDiv"></div>
      <script src="peerConfig.js"></script>
    </>
  );
};

export default WebRTC;
