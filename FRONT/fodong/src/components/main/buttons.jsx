import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./mainStyle.css";

const Buttons = () => {
  const [activeAnimation, setActiveAnimation] = useState(null);
  const imagePaths = ["rabbit.png", "penguin.png"];
  const linkPaths = ["/booklist", "/album"];
  const alts = ["List", "Album"];

  const handleButtonClick = (index) => {
    setActiveAnimation(index); // 애니메이션 활성화
    setTimeout(() => {
      setActiveAnimation(null); // 애니메이션 비활성화
    }, 1000);
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
            style={{ width: "150px", height: "150px" }}
            onClick={() => handleButtonClick(index)}
          />
          {/* <button className="main-buttons">{alts[index]}</button> */}
        </Link>
      ))}
    </div>
  );
};

export default Buttons;
