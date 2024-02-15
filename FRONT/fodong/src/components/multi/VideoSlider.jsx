import React from "react";
import Slider from "react-slick";
import { Box } from "@mui/material";

const VideoSlider = ({ children }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box
      sx={{
        // position: "fixed",
        // bottom: 0,
        // left: 0,
        // right: 0,
        px: "5vw", // 좌우로 5vw의 패딩을 줍니다.
        mx: "auto", // 가로 중앙 정렬
        width: "auto", // 자동 너비 조정
        maxWidth: "90vw", // 최대 너비를 화면의 90vw로 설정
        height: "25vh",
        ".slick-list": {
          overflow: "hidden",
        },
      }}
    >
      <Slider {...settings}>{children}</Slider>
    </Box>
  );
};

export default VideoSlider;
