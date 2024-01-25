import axios from "axios";
export const signup = async (accountEmail, accountPwd) => {
  const result = await axios.post("http://192.168.100.91:8080/account/join", {
    accountEmail,
    accountPwd,
  });
  return result.data;
};
