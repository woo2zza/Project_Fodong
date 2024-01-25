import React from "react";
import { Link } from "react-router-dom";

const StartButton = () => {
  return (
    <div>
      <Link to="/storytelling">
        <img src={require(`./img/playbutton.png`)} alt="startbutton" style={{ height: '70%'}} />
      </Link>
    </div>
  );
};

export default StartButton;
