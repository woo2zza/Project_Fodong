import axios from "axios";
// import { userStore } from "../store/userStore";
const API_URL = process.env.REACT_APP_API_URL;

const searchNickname = async (nickname, token) => {
  // const token = userStore((state) => state.token);
  const params = { nickname };

  const response = await axios
    .get(`${API_URL}/friends/search`, {
      params,
      headers: {
        Authorization: `${token}`,
      },
    })
    .then((response) => {
      // console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      return [];
    });
  return response;
};

const addFriends = async (fromProfileId, toProfileId, token) => {
  const data = { fromProfileId, toProfileId };
  const response = await axios
    .post(`${API_URL}/friends/requests`, data, {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      return "친구 요청 에러:" + error;
    });

  return response;
};

export { searchNickname, addFriends };
