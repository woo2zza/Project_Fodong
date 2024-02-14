import { userStore } from "../../store/userStore";
import Logo from "../../img/logo.png";
import { useEffect } from "react";
import "./mainStyle.css";
import { useNavigate } from "react-router-dom";

const Title = ({ nickname }) => {
  const MainNavi = useNavigate();

  useEffect(() => {
    // userStore.getState().clearProfileId();
    console.log(userStore.getState().profileId);
  }, []);
  const useNickname = userStore((state) => state.nickname);

  const Mainbutton = () => {
    MainNavi("/main");
  };

  return (
    <div className="titleLogo">
      <div>
        <img src={Logo} alt="logo" onClick={Mainbutton} />
      </div>
      <div className="titleStyle">
        <div>{useNickname}'s World!</div>{" "}
      </div>
    </div>
  );
};

export default Title;
