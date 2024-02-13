import { userStore } from "../../store/userStore";
import Logo from "./image/logo.png";
import { useEffect } from "react";
import "./mainStyle.css";

const Title = ({ nickname }) => {
  useEffect(() => {
    // userStore.getState().clearProfileId();
    console.log(userStore.getState().profileId);
  }, []);

  const useNickname = userStore((state) => state.nickname);
  return (
    <div className="titleLogo">
      <div>
        <img src={Logo} alt="logo" />
      </div>
      <div className="titleStyle">
        <div>{useNickname}'s World!</div>{" "}
      </div>
    </div>
  );
};

export default Title;
