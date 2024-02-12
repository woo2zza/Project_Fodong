import React from "react";
import backgroundImage from "./img/story1.png";
import ant from "./img/1.jpg";
import grasshopper from "./img/grasshoper2.png";


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
          zIndex: 0,
        }}
      ></div>
       
    </div>
  );
};

export default Background;
