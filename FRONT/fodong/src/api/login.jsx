import axios from "axios";

export const login = async (accountEmail, accountPwd) => {
  const params = new URLSearchParams();
  params.append("accountEmail", accountEmail);
  params.append("accountPwd", accountPwd);

  try {
    const response = await axios.post(
      "http://192.168.100.91:8080/login",
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const authToken =
      response.headers["authorization"] || response.headers["Authorization"];
    if (authToken) {
      localStorage.setItem("Token", authToken); // 'Authorization' 토큰을 localStorage에 저장합니다.
    } else {
      console.log("Authorization 토큰이 없습니다.");
    }
    return response.data;
  } catch (error) {
    console.error("Login error", error);
    throw error;
  }

  //   const params = new FormData();
  //   params.append("accountEmail", accountEmail);
  //   params.append("accountPwd", accountPwd);

  //   try {
  //     const response = await axios.post(
  //       "http://192.168.100.91:8080/login",
  //       params
  //     );
  //     return response.data;
  //   } catch (error) {
  //     console.error("Login error", error);
  //     throw error;
  //   }
};
