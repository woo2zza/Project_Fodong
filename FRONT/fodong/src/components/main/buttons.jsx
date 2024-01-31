import React from "react";
import { Link } from "react-router-dom";
import "./mainStyle.css";

const Buttons = () => {
  const imagePaths = ["chick.png", "rabbit.png", "penguin.png"];
  const linkPaths = ["/bookList", "/login", "/storyReady"];
  const alts = ["chick", "rabbit", "penguin"];

  return (
    <div className="button_container">
      {imagePaths.map((image, index) => (
        <Link to={linkPaths[index]} key={index} className="styledLink">
          <img
            src={require(`./image/${image}`)}
            alt={alts[index]}
            className="imageButton"
          />
        </Link>
      ))}
    </div>
  );
};

export default Buttons;
