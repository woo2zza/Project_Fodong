import React from "react";
import Character from "./image/3.png";
import "./mainStyle.css";
const CharacterGuide = () => {
  return (
    <div>
      <img src={Character} alt="characterGuide" className="CharImg" />
      <p>안녕! 같이 동화읽자</p>
    </div>
  );
};

export default CharacterGuide;
