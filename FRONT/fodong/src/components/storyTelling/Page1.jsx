import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MainBook from "./img/Mainbook.png";
import "./StoryTelling.css";

const Page = () => {
  const [imageSrc, setImageSrc] = useState(MainBook);
  const { page } = useParams(1);

  // useEffect(() => {
  //   fetch(`http://.com/api/image?page=${page}`)
  //     .then((response) => response.json())
  //     .then((data) => setImageSrc(data.imageUrl));
  // }, [page]);

  return (
    <div className="story_img">
      <img src={imageSrc} alt={`page ${page}`} />
    </div>
  );
};

export default Page;
