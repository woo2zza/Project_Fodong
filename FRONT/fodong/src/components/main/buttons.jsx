import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./mainStyle.css";

const Buttons = () => {
  const [activeAnimation, setActiveAnimation] = useState(null);
  const imagePaths = [
    "chick.png",
    "rabbit.png",
    "penguin.png",
    "chick.png",
    "rabbit.png",
  ];
  const linkPaths = ["/bookList", "/", "/album", "/readbook", "/storydetail"];
  const alts = ["chick", "rabbit", "penguin", "chick"];

  const handleButtonClick = (index) => {
    setActiveAnimation(index); // 애니메이션 활성화
    setTimeout(() => {
      setActiveAnimation(null); // 애니메이션 비활성화
    }, 1000); // 1초 후에 애니메이션 비활성화
  };
  return (
    <div className="button_container">
      {imagePaths.map((image, index) => (
        <Link to={linkPaths[index]} key={index} className="styledLink">
          <img
            src={require(`./image/${image}`)}
            alt={alts[index]}
            className={`imageButton ${
              activeAnimation === index ? "fireworks-animation" : ""
            }`}
            onClick={() => handleButtonClick(index)}
          />
        </Link>
      ))}
    </div>
  );
};

export default Buttons;
