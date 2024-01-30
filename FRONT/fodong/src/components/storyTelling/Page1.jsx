import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import MainBook from "./img/Mainbook.png";
import "./StoryTelling.css";

const Page = () => {
  const [imageSrc, setImageSrc] = useState('');
  const  { page }  = useParams();

  useEffect(() => {
    // fetch(`http://.com/api/image?page=${page}`)
      // .then((response) => response.json())
      // .then((data) => setImageSrc(data.imageUrl));
      const imgeUrl = require(`./img/background${page}.png`)
      setImageSrc(imgeUrl);
      // const imageModule = require(`./img/background${page}.png`)
      // setImageSrc(images(imageModule));
  }, [page]);

  return (
    <div className="story_img">
      <img src={imageSrc} alt={`page ${page}`} style={{width : '50vw', height: '50vh'}}/>
    </div>
  );
};

export default Page;
