import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./StoryTelling.css";
import DummyScript from "./DummyScript";

const Page = ({ onPageChange }) => {
  const [imageSrc, setImageSrc] = useState("");
  const { page: pageParam } = useParams();
  const page = parseInt(pageParam, 10) || 1;
  const navigate = useNavigate();

  useEffect(() => {
    console.log(15, pageParam);
    const imgeUrl = require(`./img/story${pageParam}.png`);
    setImageSrc(imgeUrl);
  }, [pageParam]);

  const backgroundStyle = {
    flexGrow: "1",
    order: "2",
    width: "100vw",
    height: "85vh",
    backgroundImage: `url(${imageSrc})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  const handleNextPage = () => {
    const nextPage = page + 1;
    console.log(28, page);
    if (nextPage <= DummyScript.length) {
      navigate(`/storytelling/${nextPage}`);
      // setPage(nextPage);
      onPageChange();
    }
  };
  const handleBeforePage = () => {
    const BeforePage = page - 1;
    console.log(36, page);
    if (BeforePage >= 1) {
      navigate(`/storytelling/${BeforePage}`);
      // setPage(BeforePage);
      onPageChange();
    }
  };
  // ;}

  return (
    <div
      style={{
        ...backgroundStyle,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <button
        style={{
          fontSize: "3rem",
          padding: "10px 20px",
          cursor: "pointer",
          outline: "none",
          order: "1",
          background: "none",
          border: "none",
          color: "red",
          fontWeight: "700",
        }}
        onClick={handleBeforePage}
      >
        {"<"}
      </button>

      <button
        style={{
          fontSize: "3rem",
          padding: "10px 20px",
          cursor: "pointer",
          outline: "none",
          order: "3",
          color: "red",
          fontWeight: "700",
          background: "none",
          border: "none",
        }}
        onClick={handleNextPage}
      >
        {">"}
      </button>
    </div>
  );
};

export default Page;
