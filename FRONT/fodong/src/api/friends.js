import axios from "axios";
// import { userStore } from "../store/userStore";
const API_URL = process.env.REACT_APP_API_URL;

const searchNickname = async (nickname, token) => {
  // const token = userStore((state) => state.token);
  const params = { nickname };

  const response = await axios
    .get(`${API_URL}/friends/search`, params, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => console.error(error));
  // return response.data;
};

export { searchNickname };
