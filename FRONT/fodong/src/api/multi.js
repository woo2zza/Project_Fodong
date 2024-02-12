import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
const SOCKET_URL = process.env.REACT_APP_BACK_SOCKET_ENDPOINT;

const createGameRoomSession = async (token) => {
  try {
    const response = await axios.post(`${API_URL}/gamerooms/create`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    // console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export { createGameRoomSession };
