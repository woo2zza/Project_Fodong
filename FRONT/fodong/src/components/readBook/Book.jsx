import React, { useRef } from "react";
import FlipPage from "react-pageflip";

// A 컴포넌트 정의
const A = () => {
  // 총 페이지 수와 FlipPage 컴포넌트를 조작하기 위한 ref
  const totalPage = 10;
  const flipBookRef = useRef(null);
  const Image1 = `${process.env.PUBLIC_URL}/img/dummy_cover/2.jpg`;
  const Image2 = `${process.env.PUBLIC_URL}/img/dummy_cover/3.jpg`;
  const Image3 = `${process.env.PUBLIC_URL}/img/dummy_cover/4.jpg`;
  const Image4 = `${process.env.PUBLIC_URL}/img/dummy_cover/5.jpg`;
  const Image5 = `${process.env.PUBLIC_URL}/img/dummy_cover/6.jpg`;
  const Image6 = `${process.env.PUBLIC_URL}/img/dummy_cover/7.jpg`;
  const Image7 = `${process.env.PUBLIC_URL}/img/dummy_cover/8.jpg`;
  const Image8 = `${process.env.PUBLIC_URL}/img/dummy_cover/9.jpg`;
  const Image9 = `${process.env.PUBLIC_URL}/img/dummy_cover/10.jpg`;
  const Image10 = `${process.env.PUBLIC_URL}/img/dummy_cover/1.jpg`;
  const pageImages = [
    Image1,
    Image2,
    Image3,
    Image4,
    Image5,
    Image6,
    Image7,
    Image8,
    Image9,
    Image10,
  ];
  // 표지 페이지를 위한 컴포넌트
  // React.forwardRef를 사용해 ref를 내부 div로 전달
  const PageCover = React.forwardRef(({ title }, ref) => (
    <div className="page page-cover" ref={ref} data-density="hard">
      <div className="page-content">
        <h2>{title}</h2>
      </div>
    </div>
  ));

  // 페이지 클릭 시 동작하는 핸들러
  // 이미지가 클릭되면 다음 페이지로 자동으로 넘김
  const handlePageClick = (e) => {
    if (e.target.classList.contains("page-image")) {
      const clickedPageIndex = flipBookRef.current.getPageFlip().getPage();
      flipBookRef.current.getPageFlip().flipTo(clickedPageIndex + 1);
    }
  };

  // FlipPage 컴포넌트와 페이지 렌더링
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
      <FlipPage
        ref={flipBookRef}
        width={900} // 적절한 크기로 조정
        height={800}
        flippingTime={1000}
        showCover={true}
        onPageClick={handlePageClick}
      >
        <PageCover title="BOOK TITLE" />
        {/* 중간 페이지들을 렌더링합니다. */}
        {Array.from({ length: totalPage - 2 }).map((_, index) => (
          <div key={index} className="page-content">
            <h2>Page {index + 1}</h2>
            {/* 페이지에 이미지 추가 */}
            <div
              className="page-image"
              style={{
                width: "100%",
                height: "80%",
                background: `url(${pageImages[index]}) no-repeat center center`,
                backgroundSize: "cover",
              }}
            ></div>
          </div>
        ))}
        <PageCover title="THE END" />
      </FlipPage>
    </div>
  );
};

export default A;
