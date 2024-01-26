import React from "react";
import houseImage from "./img/house.png";

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
            background: `url(${houseImage}) no-repeat center center`,
            backgroundSize: "cover", // 배경 이미지를 커버로 설정
            justifyContent: "center",
            alignItems: "top",
          }}
        >
          <h1>아기 돼지 삼형제</h1>
        </div>
       
      </div>
    </div>
  );
};

export default Background;
