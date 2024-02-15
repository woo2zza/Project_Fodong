import React, { useRef } from "react";
import FlipPage from "react-pageflip";
import "./book.css";
import { useNavigate } from "react-router-dom";

const A = () => {
  const Nav = useNavigate();
  const flipBookRef = useRef(null);

  const Image1 = `${process.env.PUBLIC_URL}/img/pinokio/1.webp`;
  const Image2 = `${process.env.PUBLIC_URL}/img/pinokio/2.webp`;
  const Image3 = `${process.env.PUBLIC_URL}/img/pinokio/3.webp`;
  const Image4 = `${process.env.PUBLIC_URL}/img/pinokio/4.webp`;
  const Image5 = `${process.env.PUBLIC_URL}/img/pinokio/5.webp`;
  const Image6 = `${process.env.PUBLIC_URL}/img/pinokio/6.webp`;
  const Image7 = `${process.env.PUBLIC_URL}/img/pinokio/7.webp`;
  const Image8 = `${process.env.PUBLIC_URL}/img/pinokio/8.webp`;

  const pageImages = [
    Image1,
    Image2,
    Image3,
    Image4,
    Image5,
    Image6,
    Image7,
    Image8,
  ];

  const Script = [
    "제페토 할아버지가 마법의 나무로 인형을 만들었어요. 그 이름은 피노키오! 제페토 할아버지는 피노키오가 진짜 소년이 되기를 바랐죠.",
    "피노키오가 갑자기 움직이기 시작했어요. '나 살아있어!' 제페토 할아버지는 피노키오를 사랑으로 가르치기 시작했답니다.",
    "제페토 할아버지는 피노키오를 학교에 보냈어요. 하지만 피노키오는 인형극단에 끌려가고 말았죠.",
    "인형극단 주인의 속임수에 빠진 피노키오. 하지만 친절한 요정의 도움으로 위험에서 벗어났어요.",
    "피노키오는 제페토 할아버지를 찾다가 바다에 빠져 거대한 고래에게 삼켜졌어요. 고래 배 속에서 제페토 할아버지를 만났답니다.",
    "피노키오와 제페토 할아버지는 고래 배 속에서 서로를 꼭 안았어요. 그들은 함께 탈출 계획을 세웠죠.",
    "집으로 돌아온 피노키오는 학교에 다니며 성실하게 살기 시작했어요. 요정의 말대로 좋은 행동을 하기로 했죠.",
    "피노키오의 선한 마음은 결국 마법으로 보상받았어요. 아침에 일어나 보니 피노키오는 진짜 소년이 되었답니다! 제페토 할아버지와 피노키오는 행복하게 살았어요.",
  ];

  const Sound = [
    "https://i10c109.p.ssafy.io/tts/pino/pinocchio_1.mp3",
    "https://i10c109.p.ssafy.io/tts/pino/pinocchio_2.mp3",
    "https://i10c109.p.ssafy.io/tts/pino/pinocchio_3.mp3",
    "https://i10c109.p.ssafy.io/tts/pino/pinocchio_4.mp3",
    "https://i10c109.p.ssafy.io/tts/pino/pinocchio_5.mp3",
    "https://i10c109.p.ssafy.io/tts/pino/pinocchio_6.mp3",
    "https://i10c109.p.ssafy.io/tts/pino/pinocchio_7.mp3",
    "https://i10c109.p.ssafy.io/tts/pino/pinocchio_8.mp3",
  ];

  const handlePageClick = (e) => {
    if (e.target.classList.contains("page-image")) {
      const clickedPageIndex = flipBookRef.current.getPageFlip().getPage();
      flipBookRef.current.getPageFlip().flipTo(clickedPageIndex + 1);
    }
  };

  const playSound = (soundUrl) => {
    const audio = new Audio(soundUrl);
    audio.play();
  };

  const goMain = () => {
    Nav("/main");
  };

  return (
    <div
      className="A-con"
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="Readbook-container">
        <div className="mainButton">
          <div className="glowButtonWrapper">
            <button
              color="green"
              type="submit"
              onClick={goMain}
              className="glowButton"
            >
              <span className="buttonText">메인으로 돌아가기</span>
            </button>
          </div>
        </div>
        <div className="book-container" style={{ width: 800, height: 700 }}>
          <FlipPage
            width={800}
            height={700}
            drawShadow={true}
            flippingTime={1000}
            usePortrait={true}
            startZIndex={0}
            maxShadowOpacity={1}
            mobileScrollSupport={true}
            onPageClick={handlePageClick}
            ref={flipBookRef}
          >
            {/* 표지 페이지 */}
            <article className="page-cover">
              <h2>피 노 키 오</h2>
            </article>
            {/* 페이지 내용 */}
            {pageImages.map((image, index) => (
              <div key={index} className="page-content">
                <div
                  className="page-image"
                  style={{
                    width: "100%",
                    height: "80%",
                    background: `url(${image}) no-repeat center center`,
                    backgroundSize: "cover",
                  }}
                ></div>
                <div className="script-text">{Script[index]}</div>
                <button
                  onClick={(e) => {
                    e.preventDefault(); // 버블링을 방지합니다.
                    playSound(Sound[index]);
                  }}
                  className="voice-button"
                >
                  🔊
                </button>
              </div>
            ))}
            {/* 마지막 페이지 */}
            <article className="page-cover">
              <h2>THE END</h2>
            </article>
          </FlipPage>
        </div>
      </div>
    </div>
  );
};

export default A;
