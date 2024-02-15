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
  const useProfileId = userStore((state) => state.profileId);

  const Mainbutton = () => {
    window.location.reload();
  };

  return (
    <div className="titleLogo">
      <div>
        <img src={Logo} alt="logo" onClick={Mainbutton} />
      </div>
      <div className="titleStyle">
        <div>{useNickname}님 오늘은 어떤 동화를 읽을까요?</div>{" "}
      </div>
    </div>
  );
};

export default Title;
