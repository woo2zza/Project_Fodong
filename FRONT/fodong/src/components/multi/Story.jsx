import React, { useState, useEffect, useCallback } from "react";
import { useMultiStoryContext } from "../../contexts/MultiStoryContext.js";
import { multiStoryStore } from "../../store/multiStoryStore.js";

import "../storyTelling/StoryTelling.css";

const Story = () => {
  const [imageSrc, setImageSrc] = useState("");
  const [antCharacter, setAntCharacter] = useState();
  const [grasshopperCharacter, setGrasshopperCharacter] = useState();
  const [antSrc, setAntSrc] = useState();
  const [grasshopperSrc, setGrasshopperSrc] = useState();
  // const { antCharater, grasshopperCharater } = getCharacterStyles(page);

  const sendChangePageRequest = useMultiStoryContext();

  const {
    page,
    setPage,
    nextPage,
    prevPage,
    scriptIndex,
    setScriptIndex,
    nextScriptIndex,
  } = multiStoryStore();

  useEffect(() => {
    // console.log(15, pageParam);
    const getCharacterStyles = (page, width) => {
      const baseStyle = {
        position: "absolute",
        transition: "all 0.3s ease", // 애니메이션 효과 추가
      };

      const styles = {
        1: {
          antCharater: {
            ...baseStyle,
            bottom: "0px",
            right: "10%",
          },
          grasshopperCharater: {
            ...baseStyle,
            bottom: "0px",
            left: "10%",
          },
        },
        2: {
          antCharater: {
            ...baseStyle,
            bottom: "-5%",
            right: "2%",
          },
          grasshopperCharater: {
            ...baseStyle,
            bottom: "0px",
            left: "10%",
          },
        },
        3: {
          antCharater: {
            ...baseStyle,
            bottom: "0px",
            left: "10%",
          },
          grasshopperCharater: {
            ...baseStyle,
            bottom: "0px",
            right: "10%",
          },
        },
        // 다른 페이지에 대한 스타일을 계속 추가
      };

      return styles[page] || {};
    };

    setImageSrc(
      `${process.env.PUBLIC_URL}/img/antstory/background/${page}.jpg`
    );

    const { ant, gh } = getCharacterStyles(page);
    setAntCharacter(ant);
    setGrasshopperCharacter(gh);

    setAntSrc(
      `${process.env.PUBLIC_URL}/img/antstory/character/ant/${page}.jpg`
    );

    setGrasshopperSrc(
      `${process.env.PUBLIC_URL}/img/antstory/character/grasshopper/${page}.jpg`
    );

    console.log(page);
  }, [page]);

  // const antSrc = require(`../../../public/img/antstory/character/ant/${page}.jpg`);

  // const backgroundStyle = {
  //   flexGrow: "1",
  //   order: "2",
  //   width: "100vw",
  //   height: "85vh",
  //   backgroundImage: `url(${imageSrc})`,
  //   backgroundSize: "cover",
  //   backgroundPosition: "center",
  //   backgroundRepeat: "no-repeat",
  //   position: "relative",
  // };

  const buttonStyle = (direction) => ({
    fontSize: "3rem",
    padding: "10px 20px",
    cursor: "pointer",
    outline: "none",
    background: "none",
    border: "none",
    color: "red",
    fontWeight: "700",
    position: "absolute", // 절대 위치 사용
    top: "50%", // 화면의 가운데에 위치
    transform: "translateY(-50%)", // 정확히 중앙에 위치하기 위해
    [direction]: "20px", // direction에 따라 left 또는 right 위치 지정
    zIndex: 1, // 우선 순위 설정
  });

  // const handleNextPage = () => {
  //   // const nextPage = page + 1;
  //   const nextPage = page + 1;
  //   // 더미 lenght가 3이라서 이렇게 설정
  //   const maxLength = 3;
  //   if (nextPage <= maxLength) sendChangePageRequest("nextPage");
  // };
  // const handlePrevPage = () => {
  //   const prevPage = page - 1;
  //   if (prevPage >= 1) sendChangePageRequest("previousPage");
  // };
  const handleNextPage = useCallback(() => {
    const nextPage = page + 1;
    // 더미 lenght가 3이라서 이렇게 설정
    const maxLength = 3;
    if (nextPage <= maxLength) sendChangePageRequest("nextPage");
  }, [page, sendChangePageRequest]);
  const handlePrevPage = useCallback(() => {
    const prevPage = page - 1;
    if (prevPage >= 1) sendChangePageRequest("previousPage");
  }, [page, sendChangePageRequest]);

  return (
    <>
      <div
        style={{
          flexGrow: "1",
          order: "2",
          width: "100vw",
          height: "85vh",
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {page === 1 ? (
          <button disabled style={buttonStyle("left")} onClick={handlePrevPage}>
            {"<"}
          </button>
        ) : (
          <button style={buttonStyle("left")} onClick={handlePrevPage}>
            {"<"}
          </button>
        )}

        <img
          src={antSrc}
          alt="Ant Character"
          className="antCharacter"
          style={antCharacter}
        />
        <img
          src={grasshopperSrc}
          alt="Grasshopper Character"
          className="grasshopperCharacter"
          style={grasshopperCharacter}
        />

        {page < 3 ? (
          <button style={buttonStyle("right")} onClick={handleNextPage}>
            {">"}
          </button>
        ) : (
          <button style={buttonStyle("right")} disabled>
            {">"}
          </button>
        )}
      </div>
    </>
  );
};

export default Story;
