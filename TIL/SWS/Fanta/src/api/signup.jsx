import axios from "axios";
export const signup = async (id, pwd, email) => {
  const result = await axios.post("", {
    id,
    pwd,
    email,
  });
  return result.data;
};
