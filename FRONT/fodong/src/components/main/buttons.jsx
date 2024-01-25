import React from "react";
import { Link } from "react-router-dom";

const buttons = () => {
  const imagePaths = ["chick.png", "rabbit.png", "penguin.png"];
  return (
    <div style={containerStyle}>
      <div style={flexContainerStyle}>
        {imagePaths.map((image, index) => (
          <div key={index} style={buttonStyle}>
            {index === 0 && (
              <Link to="/login" style={linkStyle}>
                <img
                  src={require(`./image/${image}`)}
                  style={imageStyle}
                  alt="chick"
                />
              </Link>
            )}
            {index === 1 && (
              <Link to="/bookList" style={linkStyle}>
                <img
                  src={require(`./image/${image}`)}
                  style={imageStyle}
                  alt="rabbit"
                />
              </Link>
            )}
            {index === 2 && (
              <Link to="/bookself">
                <img
                  src={require(`./image/${image}`)}
                  style={imageStyle}
                  alt="penguin"
                />
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
const containerStyle = {
  alignItems: "center",
  display: "inline-flex",
};

const flexContainerStyle = {
  ...containerStyle,
  gap: 180,
};

const imageStyle = {
  width: 172,
  height: 172,
};

const buttonStyle = {
  display: "inline-block",
  cursor: "pointer",
};
const linkStyle = {
  textDecoration: "none",
  color: "inherit",
};
export default buttons;
