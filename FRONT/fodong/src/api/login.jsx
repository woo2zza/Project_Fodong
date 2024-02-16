import axios from "axios";
import { userStore } from "../store/userStore";
const API_URL = process.env.REACT_APP_API_URL;

export const login = async (accountEmail, accountPwd) => {
  const params = new URLSearchParams();
  params.append("accountEmail", accountEmail);
  params.append("accountPwd", accountPwd);

  try {
    const response = await axios.post(`${API_URL}/login`, params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const authToken =
      response.headers["authorization"] || response.headers["Authorization"];
    const authId = response.data.accountId;
    if (authToken) {
      localStorage.setItem("Token", authToken); // 'Authorization' 토큰을 저장.
      // zustand에 token과 accountEmail 저장
      userStore.getState().setToken(authToken);
      userStore.getState().setAccountEmail(accountEmail);
    } else {
      console.log("Authorization 토큰이 없습니다.");
    }

    if (authId) {
      localStorage.setItem("accountId", authId);
      userStore.getState().setAccountId(authId);
    } else {
      console.log("id 토큰이 없습니다.");
    }
    return response.data;
  } catch (error) {
    console.error("Login error", error);
    throw error;
  }
};
