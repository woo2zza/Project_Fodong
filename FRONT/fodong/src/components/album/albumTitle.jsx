import "./album.css";
import { userStore } from "../../store/userStore";

const AlbumTitle = () => {
  const useNickname = userStore((state) => state.nickname);
  return (
    <div className="Album_title">
      <div>❥ {useNickname}의 행복서랍장</div>
    </div>
  );
};

export default AlbumTitle;
