import loadingpx from "../img/loadingpx.gif";
import "./pages.css";

const Loading = () => {
  return (
    <div className={classes.loadingContainer}>
      <h1>이율곡의 자기소개를 불러오고 있습니다.</h1>
      <img src={loadingpx} alt="loadingpx" />
    </div>
  );
};

export default Loading;
