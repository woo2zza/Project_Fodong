import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Page = () => {
  const [imageSrc, setImageSrc] = useState("");
  const { page } = useParams();

  useEffect(() => {
    // 여기서 서버에서 이미지 URL을 가져옵니다.
    fetch(`http://yourserver.com/api/image?page=${page}`)
      .then((response) => response.json())
      .then((data) => setImageSrc(data.imageUrl));
  }, [page]);

  return (
    <div className="story_img">
      <img src={imageSrc} alt={`page ${page}`} />
    </div>
  );
};

export default Page;
