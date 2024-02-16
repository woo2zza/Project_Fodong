import React from "react";
import { Link } from "react-router-dom";

const StartButton = ({ style }) => {
  return (
    <div style={style}>
      <Link to="/storytelling/1">
        <img
          style={{ maxWidth: "100px", maxHeight: "100px", borderRadius: "50%" }}
          src={require(`./img/start.jpg`)}
          alt="startbutton"
        />
      </Link>
      <p style={{ textAlign: "center", fontWeight: "bold" }}>
        <h1>시작하기</h1>
      </p>
    </div>
  );
};

export default StartButton;
