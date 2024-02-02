import React, { useState, useEffect, useRef } from "react";
import "./mainStyle.css";
import Image1 from "./dummy_cover/2.png";
import Image2 from "./dummy_cover/3.png";
import Image3 from "./dummy_cover/4.png";
import Image4 from "./dummy_cover/5.png";
import Image5 from "./dummy_cover/6.png";
import Image6 from "./dummy_cover/7.png";
function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const transitionTime = 0.8;
  const delay = 3000;
  const slides = [Image1, Image2, Image3, Image4, Image5, Image6];
  const totalSlides = slides.length + 2; // 전체 슬라이드 수 (실제 이미지 + 2개의 복제 이미지)
  const sliderRef = useRef(null);
  // 복제된 첫 번째와 마지막 이미지를 배열에 추가
  const slideImages = [slides[slides.length - 1], ...slides, slides[0]];

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => {
        return prevIndex >= totalSlides - 2 ? 1 : prevIndex + 1;
      });
    }, delay);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  useEffect(() => {
    if (currentIndex === totalSlides - 1) {
      // 마지막 슬라이드(복제된 첫 번째 이미지)에 도달했을 때
      setTimeout(() => {
        sliderRef.current.style.transition = "none";
        setCurrentIndex(1); // 첫 번째 실제 이미지 위치로 이동
      }, transitionTime * 1000); // 전환 시간 후에 실행
    } else if (currentIndex === 0) {
      // 첫 번째 슬라이드(복제된 마지막 이미지)에 도달했을 때
      setTimeout(() => {
        sliderRef.current.style.transition = "none";
        setCurrentIndex(totalSlides - 2); // 마지막 실제 이미지 위치로 이동
      }, transitionTime * 1000);
    } else {
      sliderRef.current.style.transition = `transform ${transitionTime}s ease-in-out`;
    }
  }, [currentIndex]);

  const getSlideStyle = () => ({
    transform: `translateX(-${currentIndex * 100}%)`,
    display: "flex",
    transition: `transform ${transitionTime}s ease-in-out`,
  });

  return (
    <div className="slider-container" style={{ overflow: "hidden" }}>
      <div ref={sliderRef} style={getSlideStyle()}>
        {slideImages.map((image, index) => (
          <div
            className="scrollBook"
            key={index}
            style={{
              backgroundImage: `url(${image})`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
export default App;
