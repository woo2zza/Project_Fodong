import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import MainBook from "./img/Mainbook.png";
import "./StoryTelling.css";
import DummyScript from "./DummyScript";


const Page = () => {
  const [imageSrc, setImageSrc] = useState('');
  const  { page : pageParam }  = useParams();
  const [page, setPage] = useState(parseInt(pageParam, 10) || 1);
  const navigate = useNavigate();
  
  useEffect(() => {
    const imgeUrl = require(`./img/background${pageParam}.png`)
    // fetch(`http://.com/api/image?page=${page}`)
      // .then((response) => response.json())
      // .then((data) => setImageSrc(data.imageUrl));

      // const imgeUrl = require(`./img/background${page}.png`)
      setImageSrc(imgeUrl);

  }, [page, pageParam]);

  const handleNextPage = () => {
    const nextPage = page + 1;
    console.log(11, page)
    if ( nextPage <= DummyScript.length ) {
      navigate(`/storytelling/${nextPage}`);
      setPage(nextPage);
    }
  //    else if (page < DummyScript.length) {
  //     const nextpage = page + 1;
  //     navigate(`/storytelling/${nextpage}`);
  //     setPage(nextpage);
  //     setScriptIndex(0);
  //     setScript(DummyScript[nextpage -1][0].text);
  }
  // ;}

  return (
    <div>
      <button variant="filled" onClick={handleNextPage}>
        {'>'}
      </button>
    <div className="story_img">
      <img src={imageSrc} alt={`page ${page}`} style={{width : '50vw', height: '50vh'}}/>
    </div>
    </div>
  );
};

export default Page;
