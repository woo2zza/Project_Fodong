import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const TaleDetail = () => {
  const [page, setPage] = useState(1);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const pageNumber = parseInt(params.page);
    if (!isNaN(pageNumber)) {
      setPage(pageNumber);
    }
  }, [params.page]);

  const handlePlusPages = () => {
    navigate(`/babypigs/${page + 1}`);
  };

  const handleMinusPages = () => {
    navigate(`/babypigs/${Math.max(1, page - 1)}`);
  };

  const Content = () => {
    return (
      <div>
        <h3>{page}</h3>
        <h3>{page}</h3>
        <h3>{page}</h3>
        <h3>{page}</h3>
      </div>
    );
  };
  //렌더링 될 때마다 실행되게
  console.log(`현재 페이지 : ${page}`);

  return (
    <div>
      <Content />
      <button onClick={handleMinusPages} disabled={page === 1 ?? true}>
        -
      </button>
      <button onClick={handlePlusPages}>+</button>
    </div>
  );
};

export default TaleDetail;
