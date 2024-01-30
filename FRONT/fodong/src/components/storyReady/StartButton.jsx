import React from "react";
import { Link } from "react-router-dom";

const StartButton = () => {
  return (
    <div>
      <Link to="/storytelling/1">
        <img src={require(`./img/startbutton.png`)} alt="startbutton" style={{marginTop: '10', maxWidth: '100px', maxHeight: '100px'}} />
      </Link>
    </div>
  );
};

export default StartButton;
