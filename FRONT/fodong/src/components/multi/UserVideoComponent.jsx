import React from "react";
import OpenViduVideoComponent from "./OvVideo";
import { userStore } from "../../store/userStore.js";

export default function UserVideoComponent({ streamManager }) {
  const { nickname } = userStore((state) => state.nickname);
  const getNicknameTag = () => {
    // Gets the nickName of the user
    return JSON.parse(streamManager.stream.connection.data).clientData;
  };

  return (
    <div
      className="stream-container"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {/* {streamManager !== undefined ? ( */}
      <div className="streamcomponent" style={{ height: "20vh" }}>
        <OpenViduVideoComponent streamManager={streamManager} />
        <div>
          <p>{nickname}</p>
        </div>
      </div>
      {/* ) : null} */}
    </div>
  );
}
