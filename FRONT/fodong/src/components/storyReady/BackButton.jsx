import React from "react";
import { Link } from "react-router-dom";

const BackButton = ({ style }) => {
  return (
    <div style={style}>
      <Link to="/main">
        <img src={require(`./img/back1.png`)} alt="startbutton" style={{ maxWidth: '100px', maxHeight: '100px'}} />
      </Link>
      <p style={{ textAlign: "center", fontWeight: "bold" }}>
          <h1>뒤로가기~</h1>
        </p>
    </div>
  );
};

export default BackButton;
