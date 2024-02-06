// 새로운 컴포넌트 InteractiveBackground.jsx 추가
const InteractiveBackground = () => {
  const playSound = (soundFile) => {
    new Audio(soundFile).play();
  };

  return (
    <div className="interactive-background">
      <div
        className="hot-air-balloon"
        onClick={() => playSound("/path/to/sound.mp3")}
      >
        {/* 배경 요소 이미지 */}
      </div>
      {/* 기타 배경 요소 */}
    </div>
  );
};

export default InteractiveBackground;
