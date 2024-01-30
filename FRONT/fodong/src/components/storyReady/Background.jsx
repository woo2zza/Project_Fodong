import React from "react";
import houseImage from "./img/house.png";
import backgroundImage from "./img/story1.png";

const Background = () => {
  console.log(1232);
  return (
    <div>
      <div>
        <div
          style={{
            display: "flex",
            width: "100vw",
            height: "70vh",
            marginBottom: "auto",
            background: `url(${backgroundImage}) no-repeat center center`,
            backgroundSize: "cover", // 배경 이미지를 커버로 설정
            justifyContent: "center",
            alignItems: "top",
          }}
        >
          <h1>개미와 베짱이</h1>
        </div>
       
      </div>
    </div>
  );
};

export default Background;
