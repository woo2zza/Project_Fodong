import "./album.css";
import { userStore } from "../../store/userStore";
import Logo from "../../img/logo.png";
import { useNavigate } from "react-router-dom";

const AlbumTitle = () => {
  const MainNavi = useNavigate();
  const useNickname = userStore((state) => state.nickname);
  const Mainbutton = () => {
    MainNavi("/main");
  };

  return (
    <div className="Album_title">
      <div>
        <img
          src={Logo}
          alt="logo"
          className="logoContainer"
          onClick={Mainbutton}
          style={{ width: "80px" }}
        />
      </div>
      <div className="albumTitleCenter">❥ {useNickname}의 행복서랍장</div>
    </div>
  );
};

export default AlbumTitle;
