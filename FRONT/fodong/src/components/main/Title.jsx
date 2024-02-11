import { userStore } from "../../store/userStore";
// import { Logo } from "./image/logo.png";
const Title = ({ nickname }) => {
  const useNickname = userStore((state) => state.nickname);
  return (
    <div className="titleStyle">
      {/* <img src={Logo} alt="logo" /> */}
      <div>{useNickname}'s World!</div>{" "}
    </div>
  );
};

export default Title;
