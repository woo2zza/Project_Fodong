import React from "react";
import backgroundImage from "./img/story1.png";
import ant from "./img/1.jpg";
import grasshopper from "./img/grasshoper2.png";
import BackButton from "./BackButton";
import StartButton from "./StartButton";

const Background = () => {
  console.log(1232);
  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: `url(${backgroundImage}) no-repeat center center`,
          backgroundSize: "cover",
          justifyContent: "center",
          alignItems: "center",
          opacity: "0.6",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            height: "100%",
            borderRight: "4px dashed red",
            zIndex: 1,
          }}
        ></div>
      </div>
      <BackButton
        style={{
          position: "absolute",
          bottom: "20px",
          left: "20px",
          zIndex: 4,
        }}
      />
      <StartButton
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          zIndex: 1,
        }}
      />
      <img
        src={ant}
        style={{
          width: "35vw",
          // maxWidth: "400px",
          height: "auto",
          position: "absolute",
          left: "23%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 2,
        }}
        alt="Ant"
      />
      <img
        src={grasshopper}
        style={{
          width: "35vw",
          // maxWidth: "400px",
          height: "auto",
          position: "absolute",
          left: "75%",
          top: "47%",
          transform: "translate(-50%, -50%)",
          zIndex: 0,
        }}
        alt="Ant"
      />
      <p
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "7vw",
          zIndex: 3,
        }}
      >
        개미와 베짱이
      </p>
    </div>
  );
};

export default Background;
