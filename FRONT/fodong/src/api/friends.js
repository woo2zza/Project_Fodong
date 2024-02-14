import { useState } from "react";
import axios from "axios";

// import { userStore } from "../store/userStore";
const API_URL = process.env.REACT_APP_API_URL;

const getFriends = async (profileId, token) => {
  try {
    const response = await axios.get(`${API_URL}/friends/${profileId}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    // const res = response.data.map((item) => {
    //   return { profileId: item.profileId, nickname: item.nickname };
    // });
    // return res;
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

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
  const data = { fromProfileId: fromProfileId, toProfileId: toProfileId };
  console.log(data);
  console.log("요청 몇번가는지 addFriends")
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

const getFriendEmail = async (friendProfileId, token) => {
  const response = await axios
    .get(`${API_URL}/profiles/one/${friendProfileId}`, {
      headers: {
        Authorization: `${token}`,
      },
    })
    .then((response) => {
      console.log(response.data.accountEmail);
      // const email = new Array(response.data);
      console.log(response.data.accountEmail + "여거는 함수 호출 시");
      return response.data.accountEmail;
    })
    .catch((err) => console.error(err));

  return response;
};

// const acceptFriendRequest = async (fromProfileId, token) => {
//   const response = await axios
//     .post(
//       `${API_URL}/friends/accept`,
//       { fromProfileId },
//       {
//         headers: {
//           Authorization: `${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     )
//     .then((response) => {
//       return response.data;
//     })
//     .catch((error) => {
//       console.error(error);
//       return "친구 요청 수락 에러:" + error;
//     });

//   return response;
// };

// const rejectFriendRequest = async (fromProfileId, token) => {
//   const response = await axios
//     .post(
//       `${API_URL}/friends/reject`,
//       { fromProfileId },
//       {
//         headers: {
//           Authorization: `${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     )
//     .then((response) => {
//       return response.data;
//     })
//     .catch((error) => {
//       console.error(error);
//       return "친구 요청 거절 에러:" + error;
//     });

//   return response;
// };

// export { searchNickname, addFriends, acceptFriendRequest, rejectFriendRequest };
export { searchNickname, addFriends, getFriends, getFriendEmail };
