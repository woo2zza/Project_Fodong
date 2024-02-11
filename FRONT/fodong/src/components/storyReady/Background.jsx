import React from "react";
import backgroundImage from "./img/story1.png";
import ant from "./img/1.jpg";


const Background = () => {
  console.log(1232);
  return (
    <div>
      <div>
        <div
          style={{
            display: "flex",
            width: "100vw",
            height: "100vh",
            marginBottom: "auto",
            background: `url(${backgroundImage}) no-repeat center center`,
            backgroundSize: "cover", // 배경 이미지를 커버로 설정
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            opacity: "0.6",
          }}
        >
          <div style={{
            position: "absolute",
            height: "100%",
            borderRight: "2px dashed red",
            zIndex: 1,
          }}>
          </div>
          <img src={ant} style={{ position: "absolute", left: "15%", zIndex: 2 }} />
          <p style={{ fontSize: "10rem" }}>개미와 베짱이</p>
        </div>
      </div>
    </div>
  );
};

export default Background;
