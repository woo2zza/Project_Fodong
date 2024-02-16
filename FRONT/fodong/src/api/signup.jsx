import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const signup = async (accountEmail, accountPwd) => {
  const result = await axios.post(`${API_URL}/account/join`, {
    accountEmail,
    accountPwd,
  }
  );
  console.log(result);
  
  return result.data;
};
